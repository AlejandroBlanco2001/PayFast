import React from "react";
import { ChakraProvider } from '@chakra-ui/react';

import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./components/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
