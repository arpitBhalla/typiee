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
    const [value, setValue] = useState({ text: "", error: "" });
    const { getFormValue } = useForm();

    useImperativeHandle<any, FieldRef>(ref, () => ({
      getValue: () => ({ name, value: value.text }),
      validate: validateField,
    }));

    useEffect(() => {
      setValue({ text: getFormValue(name), error: "" });
    }, [name]);

    const validateField = () => {
      if (required && !value.text) {
        setValue({ text: value.text, error: "Please fill this in" });
        return false;
      }
      return true;
    };

    return (
      <Input
        fullWidth
        autoFocus
        // onChange={(event) => onChange(event.target.value)}
        {...rest}
      />
    );
  }
);
