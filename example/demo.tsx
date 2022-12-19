import React from "react";
import { SnackProvider, useSnackBar } from "../src/snackbar";
import { ThemeProvider, Button } from "@rneui/themed";

const MyChild = () => {
  const { show, hide } = useSnackBar();
  return (
    <Button
      onPress={() => {
        show("this is demo");
        show("this is demo", [
          {
            icon: "dmeo",
            onClick: () => console.log("yo"),
          },
          (id) => ({
            icon: "demoe",
            onClick: () => hide(id),
          }),
        ]);
      }}
    >
      Toast
    </Button>
  );
};

const OtherChild = ({ children }: any) => <>{children}</>;

export default function App() {
  return (
    <ThemeProvider>
      <SnackProvider>
        <OtherChild>
          <MyChild />
        </OtherChild>
      </SnackProvider>
    </ThemeProvider>
  );
}
