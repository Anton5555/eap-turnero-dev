import React from "react";
import { type ICommonComponentProps } from "./ICommonComponentProps";
import cn from "~/lib/utils";

const H5: React.FC<ICommonComponentProps> = ({ children, className }) => (
  <h5 className={cn("text-2xl font-semibold", className)}>{children}</h5>
);

export default H5;
