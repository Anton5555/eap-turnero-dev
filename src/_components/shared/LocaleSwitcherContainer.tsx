"use client";

import LocaleSwitcher from "./LocaleSwitcher";

const LocaleSwitcherContainer: React.FC = () => (
  <div className="absolute right-0 z-10 justify-end py-4 pr-4 lg:static lg:flex lg:flex-row lg:border-b lg:border-b-light-gray lg:py-2 lg:pr-6">
    <LocaleSwitcher />
  </div>
);

export default LocaleSwitcherContainer;
