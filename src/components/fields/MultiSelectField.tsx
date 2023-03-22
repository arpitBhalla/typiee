import { CommonQuestionType } from "../../types";
import { Checkbox } from "../ui/Checkbox";
import { FormControl } from "../ui/FormControl";

export interface MultiSelectProps extends CommonQuestionType {
  type: "multi";
  maxSelect: number;
  options: string[];
}
export const MultiSelectField = ({
  options,
  maxSelect,
  name,
}: MultiSelectProps) => {
  return (
    <FormControl>
      {options.map((option, index) => (
        <Checkbox name={name} label={option} key={index} />
      ))}
    </FormControl>
  );
};
