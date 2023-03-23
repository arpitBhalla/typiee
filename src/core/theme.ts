import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { Questrial } from "next/font/google";

export const questrial = Questrial({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(0, 119, 255)",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    mode: "dark",
  },
  typography: {
    fontFamily: questrial.style.fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
  },
});

export default theme;
