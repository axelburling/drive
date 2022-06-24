import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { AuthProvider } from "../context/authContext";
import { FileProvider } from "../context/fileContext";
import { UserProvider } from "../context/userContext";
import "../styles/globals.css";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const getTitle = (): string => {
    if (router.pathname.endsWith("/[id]")) {
      return "File";
    } else {
      const base = router.pathname.replace("/", "");
      return base.charAt(0).toUpperCase() + base.slice(1);
    }
  };
  return (
    <ChakraProvider>
      <AuthProvider>
        <FileProvider>
          <UserProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Head>
              <title>{getTitle()}</title>
            </Head>
            <Component {...pageProps} />
          </UserProvider>
        </FileProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
