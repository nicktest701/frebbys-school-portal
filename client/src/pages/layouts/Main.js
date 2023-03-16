import React from "react";
import Content from "./Content";

const Main = ({ children }) => {
  return (
    <main>
      <Content>{children}</Content>
    </main>
  );
};

export default Main;
