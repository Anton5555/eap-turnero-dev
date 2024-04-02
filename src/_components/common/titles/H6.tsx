import React from "react";
import { type ITitleProps } from "./ITitleProps";
import cn from "~/lib/utils";

const H6: React.FC<ITitleProps> = ({ children, className }) => (
  <h6 className={cn("text-lg ", className)}>{children}</h6>
);

export default H6;
