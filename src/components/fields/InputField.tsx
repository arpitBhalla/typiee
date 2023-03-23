import { Input } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { CommonQuestionType, FieldRef } from "../../types";
import { useForm } from "../../hooks/form";

interface InputFieldProps extends CommonQuestionType {
  onChange: (value: string) => void;
  type: "email";
}

export const InputField = forwardRef(
  ({ required, name, type, onChange, ...rest }: InputFieldProps, ref) => {
    const [value, setValue] = useState("");
    const { getFormValue } = useForm();

    useImperativeHandle<any, FieldRef>(ref, () => ({
      getValue: () => ({ name, value }),
      validate: validateField,
    }));

    useEffect(() => {
      setValue(getFormValue(name));
    }, [name]);

    const validateField = () => {
      if (required && !value) {
        console.log("error from field");
        return "Required";
      }
      return undefined;
    };

    return (
      <Input
        fullWidth
        autoFocus
        {...rest}
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
    );
  }
);
