import { MultiSelectField } from "./MultiSelectField";
import { SingleSelectField } from "./SingleSelectField";
import { QuestionType } from "../../types";
import { InputField } from "./InputField";
import React from "react";
import { DropdownField } from "./Dropdown";
import { PhoneInputField } from "./PhoneInputField";

const fields: Record<Partial<QuestionType["type"]>, any> = {
  input: InputField,
  multi: MultiSelectField,
  single: SingleSelectField,
  // dropdown: PhoneInputField,
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
