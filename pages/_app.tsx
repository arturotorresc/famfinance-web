import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Hydrate } from "react-query/hydration";
import { CurrentUserContextProvider } from "../context/CurrentUserContext";
import { theme } from "../styles/themes";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClientRef = React.useRef<QueryClient | null>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <CurrentUserContextProvider>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </CurrentUserContextProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
