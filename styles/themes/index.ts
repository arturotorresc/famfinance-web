import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

import { colors } from "./colors";
import { fonts } from "./fonts";

export const theme = extendTheme({
  fonts,
  colors,
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode("white", "gray.900")(props),
      },
    }),
  },
});
