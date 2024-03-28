import React from "react";
import { type ITitleProps } from "./ITitleProps";
import cn from "~/lib/utils";

const H1: React.FC<ITitleProps> = ({ children, className }) => {
  return (
    <h1 className={cn("text-7xl font-black text-green", className)}>
      {children}
    </h1>
  );
};

export default H1;
