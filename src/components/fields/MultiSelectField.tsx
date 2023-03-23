import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "../../hooks/form";
import { CommonQuestionType, FieldRef } from "../../types";
import { Checkbox } from "../ui/Checkbox";
import { FormControl } from "../ui/FormControl";

export interface MultiSelectProps extends CommonQuestionType {
  type: "multi";
  maxSelect: number;
  options: string[];
}

export const MultiSelectField = forwardRef(
  ({ options, maxSelect, name, required }: MultiSelectProps, ref) => {
    const { getFormValue, setFormValue } = useForm();

    useImperativeHandle<any, FieldRef>(ref, () => ({
      validate: () => {
        if (required && !getFormValue(name)) {
          return "Required";
        }
        return undefined;
      },
    }));

    return (
      <FormControl>
        {options.map((option, index) => (
          <Checkbox
            name={name}
            label={option}
            key={index}
            value={option}
            defaultChecked={option === getFormValue(name)}
            onChange={(ev) => {
              setFormValue(name, ev.target.value);
            }}
          />
        ))}
      </FormControl>
    );
  }
);
