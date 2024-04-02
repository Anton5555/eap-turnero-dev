import React from "react";
import { type ITitleProps } from "./ITitleProps";
import cn from "~/lib/utils";

const H2: React.FC<ITitleProps> = ({ children, className }) => (
  <h2 className={cn("text-6xl font-bold", className)}>{children}</h2>
);

export default H2;
