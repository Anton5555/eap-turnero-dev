import React from "react";
import Sidebar from "~/_components/shared/Sidebar";

export const metadata = {
  title: "EAP Turnero",
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <section className="h-screen w-screen bg-grayBg">
    <Sidebar>{children}</Sidebar>
  </section>
);

export default Layout;
