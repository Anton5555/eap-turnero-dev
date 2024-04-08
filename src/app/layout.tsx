import "~/styles/globals.css";

import { Lato, Inter } from "next/font/google";
import { QueryProvider, SessionProvider } from "./providers";
import { getServerSession } from "next-auth";
import Toaster from "~/_components/shared/toaster/toaster";

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

export const metadata = {
  title: "EAP Latina",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  return (
    <html lang="es">
      <body className={`font-sans ${lato.variable} ${inter.variable}`}>
        <QueryProvider>
          <SessionProvider session={session}>{children}</SessionProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
