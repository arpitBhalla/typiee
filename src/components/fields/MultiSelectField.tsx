import { Box } from "@mui/material";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useForm } from "../../hooks/form";
import { CommonQuestionType, FieldRef } from "../../types";
import { Checkbox } from "../ui/Checkbox";
import { FormControl } from "../ui/FormControl";
import { If } from "../ui/If";

export interface MultiSelectProps extends CommonQuestionType {
  type: "multi";
  maxSelect: number;
  options: string[];
}

export const MultiSelectField = forwardRef(
  ({ options, maxSelect, name, required }: MultiSelectProps, ref) => {
    const { getFormValue, setFormValue, clearError } = useForm();

    const [size, setSize] = useState(0);
    const valueSet = useRef(new Set<string>());

    useImperativeHandle<any, FieldRef>(ref, () => ({
      validate: () => {
        if (required && !valueSet.current.size) {
          return "Required";
        } else if (valueSet.current.size < maxSelect) {
          return `Select at least ${maxSelect} options`;
        }
        return undefined;
      },
    }));

    useEffect(() => {
      valueSet.current = getFormValue(name) as unknown as Set<string>;
      setSize(valueSet.current.size);
    }, [name]);

    return (
      <FormControl>
        <Box height={18}>
          <If cond={valueSet.current.size < maxSelect}>
            Choose {maxSelect - valueSet.current.size}
            <If cond={!!valueSet.current.size}> more</If>
          </If>
        </Box>
        {options.map((option, index) => (
          <Checkbox
            disabled={size === maxSelect && !valueSet.current.has(option)}
            name={name}
            label={option}
            key={index}
            value={option}
            checked={valueSet.current.has(option)}
            onChange={(ev) => {
              if (valueSet.current.has(ev.target.value)) {
                valueSet.current.delete(ev.target.value);
              } else {
                valueSet.current.add(ev.target.value);
              }
              // @ts-ignore
              setFormValue(name, new Set(valueSet.current));
              setSize(valueSet.current.size);
              clearError();
            }}
          />
        ))}
      </FormControl>
    );
  }
);
