import React from "react";
import { type ICommonComponentProps } from "./ICommonComponentProps";
import cn from "~/lib/utils";

const H6: React.FC<ICommonComponentProps> = ({ children, className }) => (
  <h6 className={cn("text-lg leading-5", className)}>{children}</h6>
);

export default H6;
