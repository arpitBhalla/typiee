import styled from "@emotion/styled";
import { CheckOutlined } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import Container from "@mui/material/Container";
import React from "react";

const checkedColor = grey[50];
const unCheckedColor = grey[600];

const Label = styled("label")(({ theme }) => ({
  display: "inline-flex",
  gap: 8,
  position: "relative",
  cursor: "pointer",
  padding: "4px 8px",
  border: "solid 2px",
  borderColor: unCheckedColor,
  borderRadius: 2,
  userSelect: "none",
  alignItems: "center",
  input: {
    display: "none",
  },
  "span.index": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
    height: 20,
    width: 20,
    border: "solid 2px",
    borderColor: unCheckedColor,
  },
  "span.label": {
    flex: 1,
  },
  svg: {
    display: "none",
  },
  "&:hover": {
    backgroundColor: unCheckedColor + "80",
  },
  "&:has(input:checked)": {
    animation: "blink .5s",
    borderColor: checkedColor,
    "span.index": {
      borderColor: checkedColor,
      backgroundColor: checkedColor,
      color: "black",
    },
    svg: {
      display: "block",
    },
  },
}));

interface LabeledFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "radio" | "checkbox";
  label: string;
}

const LabeledField = ({
  type = "checkbox",
  checked,
  placeholder,
  label,
  ...rest
}: LabeledFieldProps) => {
  return (
    <Label>
      <span className="index">{placeholder}</span>
      <span className="label">{label}</span>
      <input type={type} checked={checked} {...rest} />
      <CheckOutlined htmlColor="white" />
    </Label>
  );
};

const Checkbox = (props: LabeledFieldProps) =>
  React.createElement(LabeledField, {
    type: "checkbox",
    ...props,
  });

const Radio = (props: LabeledFieldProps) =>
  React.createElement(LabeledField, {
    type: "radio",
    ...props,
  });

const FormFieldContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  maxWidth: 220,
});

const FormField = ({ children }: React.PropsWithChildren) => {
  return (
    <FormFieldContainer>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement, {
          placeholder: String.fromCharCode(index + 65),
        })
      )}
    </FormFieldContainer>
  );
};

export default function Home() {
  return (
    <Container maxWidth="lg">
      <FormField>
        <Radio name="demo" label="Demo" />
        <Radio name="demo" label="Demo" />
      </FormField>
      <FormField>
        <Checkbox name="demo" label="Demo" />
        <Checkbox name="demo" label="Demo" />
      </FormField>
    </Container>
  );
}
