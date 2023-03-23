import { MultiSelectField } from "./MultiSelectField";
import { SingleSelectField } from "./SingleSelectField";
import { QuestionType } from "../../types";
import { InputField } from "./InputField";
import React from "react";

const fields: Record<Partial<QuestionType["type"]>, any> = {
  input: InputField,
  multi: MultiSelectField,
  single: SingleSelectField,
  dropdown: SingleSelectField,
  info: null,
};

interface FormFieldProps {
  type: QuestionType["type"];
  props: any;
  value: string;
  onChange: (value: string) => void;
}

export const FormField = React.forwardRef(
  ({ type, props, value, onChange }: FormFieldProps, ref) => {
    const field = fields[type];
    if (!field) return null;
    return React.createElement(field, { value, onChange, ...props, ref });
  }
);
