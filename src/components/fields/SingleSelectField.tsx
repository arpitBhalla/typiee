import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "../../hooks/form";
import { CommonQuestionType, FieldRef } from "../../types";
import { FormControl } from "../ui/FormControl";
import { Radio } from "../ui/Radio";

export interface SingleSelectProps extends CommonQuestionType {
  type: "single";
  options: string[];
}

export const SingleSelectField = forwardRef(
  ({ options, name, required }: SingleSelectProps, ref) => {
    const { getFormValue, setFormValue, gotoNextQuestion } = useForm();

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
          <Radio
            name={name}
            label={option}
            key={index}
            value={option}
            defaultChecked={option === getFormValue(name)}
            onChange={(ev) => {
              setFormValue(name, ev.target.value);
              gotoNextQuestion();
            }}
          />
        ))}
      </FormControl>
    );
  }
);
