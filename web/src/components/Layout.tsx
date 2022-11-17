import React from "react";
import { Navbar } from "./Navbar";
import { Wrapper } from "./Wrapper";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Wrapper>{children}</Wrapper>
    </>
  );
};
