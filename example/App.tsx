import React from "react";
import {
  SnackProvider,
  useSnackBar,
  withSnackbar,
  PropsWithSnackbar,
} from "./src";
import Button from "@rneui/themed/dist/Button";
import {
  ThemeProvider,
  createTheme,
} from "@rneui/themed/dist/config/ThemeProvider";
import { Snackbar } from "./src/types";
import { Text, View } from "react-native";

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
    <Text>{name || "Press"}</Text>
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
    <ThemeProvider theme={createTheme({ mode: "dark" })}>
      <SnackProvider>
        <View
          style={{
            height: 200,
            marginTop: 150,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <HOC />
          <Class />
          <Hook />
        </View>
      </SnackProvider>
    </ThemeProvider>
  );
}
