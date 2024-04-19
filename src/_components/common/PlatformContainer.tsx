import React from "react";
import cn from "~/lib/utils";

export interface PlatformContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PlatformContainer: React.FC<PlatformContainerProps> = ({
  children,
  className,
}) => (
  <div
    className={cn(
      "rounded-3xl bg-white shadow-custom-light lg:grid lg:gap-x-8 lg:gap-y-8 lg:rounded-3xl lg:p-6",
      className,
    )}
  >
    {children}
  </div>
);

export default PlatformContainer;
