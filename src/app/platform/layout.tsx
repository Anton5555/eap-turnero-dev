import React from "react";
import Sidebar from "~/_components/shared/Sidebar";

export const metadata = {
  title: "EAP Turnero",
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <section className="bg-gray-bg h-full min-h-screen w-screen">
    <Sidebar>
      <div className="mx-auto lg:space-y-4 lg:px-8 lg:py-4 xl:max-w-screen-2xl">
        {children}
      </div>
    </Sidebar>
  </section>
);

export default Layout;
