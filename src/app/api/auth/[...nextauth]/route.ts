import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "~/types/User";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const LoginAdapter = (
  credentials: Record<"email" | "password", string> | undefined,
) => ({
  Username: credentials?.email,
  Password: credentials?.password,
});

type EAPUser = {
  mail: string;
  idpaciente: number;
  sede: number;
  pdp: string;
  pdp_date: string;
  fecha_nacimiento: string;
  empresa: string;
  empresaname: null | string;
  telefono: null | string;
  movil: null | string;
  tipo: string;
  img: null | string;
  dni: null | string;
  nombre: string;
  apellido1: string;
  apellido2: null | string;
  huso: null | string;
  tipousuarioportal: string;
  a_b: string;
  puesto: string;
  turnoonline: string;
  password: null | string;
  paises: null | string;
  services: any[];
};

type AuthenticatedUser = {
  user: EAPUser;
  token: string;
};

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
          else if (response.status === 404)
            throw new Error("Usuario no encontrado");
          else if (response.status === 412)
            throw new Error(
              "Debe asociarse el familiar al empleado. Contacte con EAP por favor.",
            );

          throw new Error("Error al iniciar sesión");
        }

        const userData: AuthenticatedUser =
          (await response.json()) as AuthenticatedUser;

        const { user: eapUser, token } = userData;

        const user: User = {
          id: eapUser.idpaciente,
          email: eapUser.mail,
          name: eapUser.nombre,
          lastName: eapUser.apellido1,
          image: eapUser.img ?? "",
          accessToken: token,
        };

        if (user) return user as User;
        else return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
