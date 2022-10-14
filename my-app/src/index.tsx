import React from "react";
import { ChakraProvider } from '@chakra-ui/react';

import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
