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

export const FormField = ({
  type,
  props,
  value,
  onChange,
}: {
  type: QuestionType["type"];
  props: any;
  value: string;
  onChange: (value: string) => void;
}) => {
  const field = fields[type];
  if (!field) return null;
  return React.createElement(field, { value, onChange, ...props });
};
