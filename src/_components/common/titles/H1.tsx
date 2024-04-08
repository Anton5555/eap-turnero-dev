import React from "react";
import { type ICommonComponentProps } from "./ICommonComponentProps";
import cn from "~/lib/utils";

const H1: React.FC<ICommonComponentProps> = ({ children, className }) => (
  <h1 className={cn("text-7xl font-black text-green", className)}>
    {children}
  </h1>
);

export default H1;
