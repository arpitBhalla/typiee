import { CheckOutlined } from "@mui/icons-material";
import { styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { If } from "./If";

const checkedColor = grey[50];
const unCheckedColor = grey[600];

const Label = styled("label")(({ theme }) => ({
  display: "inline-flex",
  gap: 8,
  position: "relative",
  cursor: "pointer",
  padding: "6px 8px",
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
    fontSize: 12,
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

export interface LabeledFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "radio" | "checkbox";
  label: string;
  labelStyle?: React.CSSProperties;
  noPlaceholder?: boolean;
}

export const LabeledField = ({
  type = "checkbox",
  checked,
  placeholder,
  noPlaceholder,
  label,
  labelStyle,
  ...rest
}: LabeledFieldProps) => {
  return (
    <Label style={labelStyle}>
      <If cond={!noPlaceholder}>
        <span className="index">{placeholder}</span>
      </If>
      <span className="label">{label}</span>
      <input type={type} checked={checked} {...rest} />
      <CheckOutlined htmlColor="white" />
    </Label>
  );
};
