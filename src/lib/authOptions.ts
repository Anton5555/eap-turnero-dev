import { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthenticatedUser, User } from "~/types/users";
import { env } from "~/env";
import { parseJwt } from "./utils";

const API_URL = env.NEXT_PUBLIC_API_URL;

const parseUser = (authenticatedUser: AuthenticatedUser): User => {
  const { user: eapUser, token } = authenticatedUser;

  return {
    id: eapUser.idpaciente.toString(),
    email: eapUser.mail,
    name: eapUser.nombre,
    lastName: eapUser.apellido1,
    image: eapUser.img ?? "",
    company: parseInt(eapUser.empresa),
    location: eapUser.sede,
    userType: eapUser.tipousuarioportal === "empleado" ? "employee" : "family",
    services: eapUser.services.map((service) => service.code),
    position: eapUser.puesto ? parseInt(eapUser.puesto) : undefined,
    timezone: eapUser.huso,
    accessToken: token,
  };
};

const renewToken = async (token: string) => {
  const headers = new Headers();
  headers.append("Authorization", token);

  const response = await fetch(`${API_URL}/token/renewToken`, {
    method: "GET",
    headers,
  });

  if (response.ok) {
    const userData = (await response.json()) as AuthenticatedUser;

    const user = parseUser(userData);

    return user;
  }
};

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

        const user = parseUser(userData);

        return user ? (user as User) : null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) token.user = user as User;

      if (
        trigger !== "signIn" &&
        trigger !== "signUp" &&
        token.user.accessToken
      ) {
        let updateToken = false;

        // If the trigger is "update", always update the token (called from updateProfile for example)
        if (trigger === "update") updateToken = true;
        // The trigger when called from the session provider is undefined
        else {
          const parsedJwtToken = parseJwt(token.user.accessToken);

          // Get the expiry date in milliseconds
          const expires = parsedJwtToken.exp * 1000;

          // Subtract 10 hours from the expiry date to get the last update date
          const lastUpdate = expires - 10 * 60 * 60 * 1000;

          // If the token was last updated more than 10 minutes ago, update it
          if (Date.now() - lastUpdate > 10 * 60 * 1000) updateToken = true;
        }

        if (updateToken) {
          const user = await renewToken(token.user.accessToken);

          if (user) token.user = user;
        }
      }

      return token;
    },
    async session({ session, token }) {
      const parsedJwtToken = parseJwt(token.user.accessToken);

      const expiryDateISOString = new Date(
        parsedJwtToken.exp * 1000,
      ).toISOString();

      // This is the expiry date of the session, it takes care of the automatic logout if expired
      session.expires = expiryDateISOString;

      session.user = token.user;

      return session;
    },
  },
};

export default authOptions;
