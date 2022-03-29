import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/authContext";
import { FileProvider } from "../context/fileContext";
// import { BrowserRouter } from "react-router-dom";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <FileProvider>
          <Component {...pageProps} />
        </FileProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
