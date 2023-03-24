import { Input } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useForm } from "../../hooks/form";
import { CommonQuestionType, FieldRef } from "../../types";

interface InputFieldProps extends CommonQuestionType {
  type: "email";
}

export const InputField = forwardRef(
  ({ required, name, type, ...rest }: InputFieldProps, ref) => {
    const { getFormValue, setFormValue } = useForm();
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle<any, FieldRef>(ref, () => ({
      validate: () => {
        if (required && !getFormValue(name)) {
          return "Please fill this in";
        }
        return undefined;
      },
    }));

    useEffect(() => {
      inputRef.current?.focus();
      inputRef.current!.value = getFormValue(name);
    }, [name]);

    return (
      <Input
        fullWidth
        inputRef={inputRef}
        sx={{ fontSize: "30px" }}
        placeholder="Type your answer here..."
        {...rest}
        onChange={(event) => {
          setFormValue(name, event.target.value);
        }}
      />
    );
  }
);
