import React from "react";
import { useSnackBar } from "./useSnackbar";

export type PropsWithSnackbar<T = {}> = T & {
  snackbar?: ReturnType<typeof useSnackBar>;
};

export const withSnackbar =
  <Props extends {}>(
    Component:
      | React.FunctionComponent<PropsWithSnackbar<Props>>
      | React.ComponentType<PropsWithSnackbar<Props>>
  ) =>
  (props: Props & { snackbar?: ReturnType<typeof useSnackBar> }) => {
    const snackbar = useSnackBar();
    return <Component {...props} snackbar={snackbar} />;
  };

let App = withSnackbar((props) => <>{props.snackbar}</>);

let App2 = (props: PropsWithSnackbar) => <>{props.snackbar}</>;

let App3 = withSnackbar(App);
