import React from "react";
import "../styles/globals.css";
import RouterConfig from "./router";

const app: React.FC = () => {
  return (
    <div className="app">
      <RouterConfig />
    </div>
  );
};

export default app;
