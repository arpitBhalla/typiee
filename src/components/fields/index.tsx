import { MultiSelectField } from "./MultiSelectField";
import { SingleSelectField } from "./SingleSelectField";
import { QuestionType } from "../../types";
import { InputField } from "./InputField";
import React from "react";

const fields: Record<QuestionType["type"], any> = {
  input: InputField,
  multi: MultiSelectField,
  single: SingleSelectField,
  dropdown: "demo",
  info: null,
};

export const FormField = ({
  type,
  props,
}: {
  type: QuestionType["type"];
  props: any;
}) => {
  const field = fields[type] || null;

  return React.createElement(field, props);
};
