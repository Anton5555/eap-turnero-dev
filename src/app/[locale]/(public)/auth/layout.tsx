import { getLocale } from "next-intl/server";
import React from "react";
import LanguageNotImplementedDialog from "~/_components/common/LanguageNotImplementedDialog";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentLocale = await getLocale();

  return (
    <section>
      {children}

      {currentLocale === "pt" && <LanguageNotImplementedDialog />}
    </section>
  );
};

export default Layout;
