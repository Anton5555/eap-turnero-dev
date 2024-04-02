import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <section className="items-center lg:mx-4 lg:my-6 lg:justify-between">
    {children}
  </section>
);

export default Layout;
