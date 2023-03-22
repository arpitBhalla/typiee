import React from "react";
import { LabeledField, LabeledFieldProps } from "./LabeledField";

export const Radio = (props: LabeledFieldProps) =>
  React.createElement(LabeledField, {
    type: "radio",
    ...props,
  });
