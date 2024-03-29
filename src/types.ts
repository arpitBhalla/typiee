import { MultiSelectProps } from "./components/fields/MultiSelectField";
import { SingleSelectProps } from "./components/fields/SingleSelectField";

export interface CommonQuestionType {
  title: string;
  name: string;
  summary?: string;
  required?: boolean;
  action: {
    title: string;
    icon: "done" | "none";
    next?: boolean;
    submit?: boolean;
  };
  validation?: "email" | "phone";
  placeholder?: string;
}

interface Dropdown extends CommonQuestionType {
  type: "dropdown";
  options: string[];
}

interface Rest extends CommonQuestionType {
  type: "info" | "input";
}

export type QuestionType =
  | Dropdown
  | SingleSelectProps
  | MultiSelectProps
  | Rest;

export interface FieldRef {
  // getValue: () => {
  //   name: string;
  //   value: string;
  //   required?: boolean;
  // };
  validate: () => string | undefined;
}
