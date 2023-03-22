import { styled } from "@mui/material";
import React from "react";

const FormControlContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  maxWidth: 360,
});

export const FormControl = ({ children }: React.PropsWithChildren) => {
  return (
    <FormControlContainer>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement, {
          placeholder: String.fromCharCode(index + 65),
        })
      )}
    </FormControlContainer>
  );
};
