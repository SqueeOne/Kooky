import React from "react";

interface WrapperProps {}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <div className="mt-8 mx-auto w-full max-w-3xl">{children}</div>;
};
