import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <section className="items-center lg:mx-10 lg:my-10 lg:justify-between">
    {children}
  </section>
);

export default Layout;
