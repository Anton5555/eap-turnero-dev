import React from "react";
import { type ICommonComponentProps } from "./ICommonComponentProps";
import cn from "~/lib/utils";

const H4: React.FC<ICommonComponentProps> = ({ children, className }) => (
  <h4 className={cn("text-[28px] font-bold leading-8 text-green", className)}>
    {children}
  </h4>
);

export default H4;
