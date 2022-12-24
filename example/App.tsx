import React from "react";
import {
  SnackProvider,
  useSnackBar,
  withSnackbar,
  PropsWithSnackbar,
} from "./src";
import { ThemeProvider, Button } from "@rneui/themed";
import { Snackbar } from "./src/types";

const Base = ({ snackbar, name }: { snackbar: Snackbar; name: string }) => (
  <Button
    onPress={() => {
      snackbar?.show("called from " + name);
      // snackbar?.show("this is demo", [
      //   {
      //     icon: "demo",
      //     onClick: () => console.log("yo"),
      //   },
      //   (id) => ({
      //     icon: "demoe",
      //     onClick: () => snackbar?.hide(id),
      //   }),
      // ]);
    }}
  >
    {name || "Press"}
  </Button>
);

const Class = withSnackbar(
  class extends React.Component<PropsWithSnackbar> {
    render() {
      return <Base name="Class" snackbar={this.props.snackbar!} />;
    }
  }
);

const HOC = withSnackbar((props) => {
  return <Base name="HOC" snackbar={props.snackbar!} />;
});

const Hook = () => {
  const snackbar = useSnackBar();
  return <Base name="Hook" snackbar={snackbar} />;
};

export default function App() {
  return (
    <ThemeProvider>
      <SnackProvider>
        <HOC />
        <Class />
        <Hook />
      </SnackProvider>
    </ThemeProvider>
  );
}
