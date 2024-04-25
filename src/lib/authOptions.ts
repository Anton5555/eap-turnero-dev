import { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthenticatedUser, User } from "~/types/users";
import { env } from "~/env";
import { parseJwt } from "./utils";

const API_URL = env.NEXT_PUBLIC_API_URL;

const LoginAdapter = (
  credentials: Record<"email" | "password", string> | undefined,
) => ({
  Username: credentials?.email,
  Password: credentials?.password,
});

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const response = await fetch(`${API_URL}/login/authenticate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(LoginAdapter(credentials)),
        });

        if (!response.ok) {
          if (response.status === 401) throw new Error("Contraseña incorrecta");

          if (response.status === 404) throw new Error("Usuario no encontrado");

          if (response.status === 412)
            throw new Error(
              "Debe asociarse el familiar al empleado. Contacte con EAP por favor.",
            );

          throw new Error("Error al iniciar sesión");
        }

        const userData: AuthenticatedUser =
          (await response.json()) as AuthenticatedUser;

        const { user: eapUser, token } = userData;

        const user: User = {
          id: eapUser.idpaciente.toString(),
          email: eapUser.mail,
          name: eapUser.nombre,
          lastName: eapUser.apellido1,
          image: eapUser.img ?? "",
          company: parseInt(eapUser.empresa),
          location: eapUser.sede,
          userType:
            eapUser.tipousuarioportal === "empleado" ? "employee" : "family",
          services: eapUser.services.map((service) => service.code),
          position: eapUser.puesto ? parseInt(eapUser.puesto) : undefined,
          timezone: eapUser.huso,
          accessToken: token,
        };

        return user ? (user as User) : null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User;

      return token;
    },
    async session({ session, token }) {
      session.expires = new Date(
        parseJwt(token.user.accessToken).exp * 1000,
      ).toISOString();

      session.user = token.user;
      return session;
    },
  },
};

export default authOptions;
