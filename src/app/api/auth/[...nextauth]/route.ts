import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const LoginAdapter = (credentials: Record<"email" | "password", string> | undefined) => ({
    Username: credentials?.email,
    Password: credentials?.password,
});

type User = {
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
  user: User;
  token: string;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth({
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
   
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize (credentials, req) {
        const response = await fetch(`${API_URL}/login/authenticate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(LoginAdapter(credentials)),
        });

        if (!response.ok) {
          if (response.status === 401)
            throw new Error("Contraseña incorrecta");
          else if (response.status === 404)
            throw new Error("Usuario no encontrado");
          else
            throw new Error("Error al iniciar sesión");
        }

        const userData: AuthenticatedUser = await response.json() as AuthenticatedUser;

        const { user, token } =  userData;

        if (user) return {
          id: user.idpaciente,
          email: user.mail,
          name: user.nombre,
          // accessToken: token,
        };

        else return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };  
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
