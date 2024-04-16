import React from "react";
import cn from "~/lib/utils";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

const H1: React.FC<TypographyProps> = ({ children, className }) => (
  <h1 className={cn("text-7xl font-black text-green", className)}>
    {children}
  </h1>
);

const H2: React.FC<TypographyProps> = ({ children, className }) => (
  <h2 className={cn("text-6xl font-bold", className)}>{children}</h2>
);

const H3: React.FC<TypographyProps> = ({ children, className }) => (
  <h3 className={cn("text-2xl font-bold lg:text-4xl", className)}>
    {children}
  </h3>
);

const H4: React.FC<TypographyProps> = ({ children, className }) => (
  <h4 className={cn("text-[28px] font-bold leading-8 text-green", className)}>
    {children}
  </h4>
);

const H5: React.FC<TypographyProps> = ({ children, className }) => (
  <h5 className={cn("text-2xl font-semibold", className)}>{children}</h5>
);

const H6: React.FC<TypographyProps> = ({ children, className }) => (
  <h6 className={cn("text-lg leading-5", className)}>{children}</h6>
);

export { H1, H2, H3, H4, H5, H6 };
