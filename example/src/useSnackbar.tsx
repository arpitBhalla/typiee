import React from "react";
import { SnackBarContext } from "./SnackBarContext";

export const useSnackBar = () => React.useContext(SnackBarContext);
