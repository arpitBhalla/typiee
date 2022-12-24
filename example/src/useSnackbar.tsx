import React from "react";
import { SnackBarContext } from "./SnackbarContext";

export const useSnackBar = () => React.useContext(SnackBarContext);
