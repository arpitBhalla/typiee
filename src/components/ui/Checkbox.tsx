import React from "react";
import { LabeledField, LabeledFieldProps } from "./LabeledField";

export const Checkbox = (props: LabeledFieldProps) =>
  React.createElement(LabeledField, {
    type: "checkbox",
    ...props,
  });
