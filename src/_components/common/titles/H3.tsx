import React from "react";
import { type ICommonComponentProps } from "./ICommonComponentProps";
import cn from "~/lib/utils";

const H3: React.FC<ICommonComponentProps> = ({ children, className }) => (
  <h3 className={cn("text-4xl font-bold", className)}>{children}</h3>
);

export default H3;
