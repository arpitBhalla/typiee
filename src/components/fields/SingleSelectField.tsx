import { CommonQuestionType } from "../../types";
import { FormControl } from "../ui/FormControl";
import { Radio } from "../ui/Radio";

export interface SingleSelectProps extends CommonQuestionType {
  type: "single";
  options: string[];
}
export const SingleSelectField = ({ options, name }: SingleSelectProps) => {
  return (
    <FormControl>
      {options.map((option, index) => (
        <Radio name={name} label={option} key={index} />
      ))}
    </FormControl>
  );
};
