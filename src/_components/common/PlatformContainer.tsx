import React from "react";
import cn from "~/lib/utils";
import { type ICommonComponentProps } from "./titles/ICommonComponentProps";

const PlatformContainer: React.FC<ICommonComponentProps> = ({
  children,
  className,
}) => (
  <div
    className={cn(
      "shadow-custom-light rounded-3xl bg-white lg:grid lg:min-h-[calc(50dvh)] lg:gap-x-8 lg:gap-y-8 lg:rounded-3xl lg:px-4 lg:py-8",
      className,
    )}
  >
    {children}
  </div>
);

export default PlatformContainer;
