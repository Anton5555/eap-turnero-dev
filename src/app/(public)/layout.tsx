import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <section className="items-center md:mx-4 md:my-6 md:justify-between">
    {children}
  </section>
);

export default Layout;
