import React from "react";

interface IfProps {
  cond?: boolean;
}

export const If = ({ cond, children }: React.PropsWithChildren<IfProps>) => {
  if (!cond) return null;
  return <>{children}</>;
};
