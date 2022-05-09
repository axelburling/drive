import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";

hydrateRoot(
  document.getElementById("root")!,
  <React.StrictMode>
    <Router>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Router>
  </React.StrictMode>
);
// .render(
//   <React.StrictMode>
//     <Router>
//       <ChakraProvider>
//         <App />
//       </ChakraProvider>
//     </Router>
//   </React.StrictMode>
// );
