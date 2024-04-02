import "~/styles/globals.css";

import { Lato as FontSans } from "next/font/google";
import { QueryProvider, SessionProvider } from "./providers";
import { getServerSession } from "next-auth";

const inter = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});

export const metadata = {
  title: "EAP Latina",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} lg:px-6 lg:py-8`}>
        <QueryProvider>
          <SessionProvider session={session}>{children}</SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
