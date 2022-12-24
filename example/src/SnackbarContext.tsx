import { createContext } from "react";
import { Snackbar } from "./types";

export const SnackBarContext = createContext<Snackbar>({
  show: () => -1,
  hide: () => {},
});
