import React from "react";
import { QuestionType } from "../../types";
import { DropdownField } from "./Dropdown";
import { InputField } from "./InputField";
import { MultiSelectField } from "./MultiSelectField";
import { SingleSelectField } from "./SingleSelectField";

const fields: Record<Partial<QuestionType["type"]>, any> = {
  input: InputField,
  multi: MultiSelectField,
  single: SingleSelectField,
  dropdown: DropdownField,
  info: null,
};

interface FormFieldProps {
  type: QuestionType["type"];
  props: any;
}

export const FormField = React.forwardRef(
  ({ type, props }: FormFieldProps, ref) => {
    const field = fields[type];
    if (!field) return null;
    return React.createElement(field, { ...props, ref });
  }
);
