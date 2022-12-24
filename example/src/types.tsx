export type Snackbar = {
  show: Show;
  hide: (id: number) => void;
};

export type SnackbarProviderProps = {
  children: React.ReactNode;
  manualHide?: boolean;
  autoHideDuration?: number;
  dense?: boolean;
  maxSnack?: number;
  variant?: "default" | "error" | "success";
  origin?: {
    horizontal: "left" | "right";
    vertical: "top" | "bottom";
  };
};

type SnackBarAction = {
  onClick: () => void;
  icon: string;
};

type SnackBarActions = (SnackBarAction | ((id: number) => SnackBarAction))[];

export type Show = {
  (title: string, actions?: SnackBarActions): number;
  (title: string, timeout?: number, actions?: SnackBarActions): number;
};

export type ShowParams = {
  timeout?: number;
  title: string;
  actions?: SnackBarAction[];
};
