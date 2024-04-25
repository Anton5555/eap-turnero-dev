import { getServerSession } from "next-auth";
import React from "react";
import Sidebar from "~/_components/shared/Sidebar";
import authOptions from "~/lib/authOptions";

export const metadata = {
  title: "EAP Turnero",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) return;

  const {
    user: { image, name, lastName, accessToken },
  } = session;

  return (
    <section className="h-full min-h-screen w-screen bg-gray-bg">
      <Sidebar userData={{ name, lastName, image, accessToken }}>
        <div className="mx-auto lg:space-y-4 lg:px-8 lg:py-4 xl:max-w-screen-2xl">
          {children}
        </div>
      </Sidebar>
    </section>
  );
};

export default Layout;
