import { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthenticatedUserApiData, User } from "~/types/users";
import { env } from "~/env";
import { parseDateWithoutTimezone, parseJwt } from "./utils";

const API_URL = env.NEXT_PUBLIC_API_URL;

const parseUser = (authenticatedUser: AuthenticatedUserApiData): User => {
  const { user: eapUser, token } = authenticatedUser;

  return {
    id: eapUser.idpaciente.toString(),
    email: eapUser.mail,
    name: eapUser.nombre,
    lastName: eapUser.apellido1,
    imageName: eapUser.img ?? "",
    company: parseInt(eapUser.empresa),
    location: eapUser.sede,
    userType: eapUser.tipousuarioportal === "empleado" ? "employee" : "family",
    userTypeId: eapUser.tipousuarioportal === "empleado" ? 1 : 2,
    services: eapUser.services.map((service) => service.code),
    position: eapUser.puesto ? parseInt(eapUser.puesto) : undefined,
    timezone: eapUser.huso,
    birthdate: eapUser.fecha_nacimiento
      ? parseDateWithoutTimezone(eapUser.fecha_nacimiento)
      : undefined,
    gender: eapUser.sexo ?? undefined,
    accessToken: token,
    pdp: eapUser.pdp === "Y",
    pdpDate: new Date(eapUser.pdp_date),
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
    const userData = (await response.json()) as AuthenticatedUserApiData;

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
    maxAge: 60 * 60 * 10,
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
          if (response.status === 401) throw new Error("invalidPassword");

          const error = (await response.text()).trim();

          throw new Error(error ?? "genericError");
        }

        const userData: AuthenticatedUserApiData =
          (await response.json()) as AuthenticatedUserApiData;

        const user = parseUser(userData);

        return user ?? null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) token.user = user as User;

      // Manual validation for token renewal
      if (
        trigger !== "signIn" &&
        trigger !== "signUp" &&
        token.user.accessToken
      ) {
        let updateToken = false;

        // If the trigger is "update", always update the token
        if (trigger === "update") updateToken = true;
        else {
          const parsedJwtToken = parseJwt(token.user.accessToken);

          if (!parsedJwtToken) return token;

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

      if (parsedJwtToken) {
        const expiryDateISOString = new Date(
          parsedJwtToken.exp * 1000,
        ).toISOString();

        // This is the expiry date of the session, next-auth takes care of the automatic logout if expired
        // We set it to the expiry date of the token because next-auth default one keeps updating all the time
        // and we want to keep the session alive as long as the token from the api is valid
        session.expires = expiryDateISOString;
      }

      session.user = token.user;

      return session;
    },
  },
};

export default authOptions;
