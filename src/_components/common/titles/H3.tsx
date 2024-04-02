import React from "react";
import { type ITitleProps } from "./ITitleProps";
import cn from "~/lib/utils";

const H3: React.FC<ITitleProps> = ({ children, className }) => (
  <h3 className={cn("text-4xl font-bold", className)}>{children}</h3>
);

export default H3;
