import "~/styles/globals.css";

import { Lato as FontSans } from "next/font/google";
import Providers from "./providers";

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

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={`font-sans ${inter.variable} lg:px-6 lg:py-8`}>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
