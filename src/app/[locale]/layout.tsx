import "~/styles/globals.css";

import { Lato, Inter, Open_Sans } from "next/font/google";
import { QueryProvider, SessionProvider } from "./providers";
import { getServerSession } from "next-auth";
import { Toaster } from "~/_components/shared/Toaster";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata = {
  title: "EAP Latina",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const RootLayout = async ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) => {
  const session = await getServerSession();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`font-sans ${lato.variable} ${inter.variable} ${openSans.variable}`}
      >
        <QueryProvider>
          <SessionProvider
            session={session}
            refetchInterval={60 * 60}
            refetchOnWindowFocus={false}
          >
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </SessionProvider>
        </QueryProvider>

        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
