import React from "react";
import LocaleSwitcherContainer from "~/_components/shared/LocaleSwitcherContainer";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex flex-col ">
    <LocaleSwitcherContainer />

    <section className="items-center lg:mx-10 lg:my-10 lg:justify-between">
      {children}
    </section>
  </div>
);

export default Layout;
