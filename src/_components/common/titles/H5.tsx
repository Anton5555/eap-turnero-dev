import React from "react";
import { type ITitleProps } from "./ITitleProps";
import cn from "~/lib/utils";

const H5: React.FC<ITitleProps> = ({ children, className }) => {
  return (
    <h5 className={cn("text-2xl font-semibold", className)}>{children}</h5>
  );
};

export default H5;
