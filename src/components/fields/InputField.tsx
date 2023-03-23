import { Input } from "@mui/material";
import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "../../hooks/form";
import { CommonQuestionType, FieldRef } from "../../types";

interface InputFieldProps extends CommonQuestionType {
  type: "email";
}

export const InputField = forwardRef(
  ({ required, name, type, ...rest }: InputFieldProps, ref) => {
    const { getFormValue, setFormValue } = useForm();

    useImperativeHandle<any, FieldRef>(ref, () => ({
      validate: () => {
        if (required && !getFormValue(name)) {
          return "Please fill this in";
        }
        return undefined;
      },
    }));

    return (
      <Input
        fullWidth
        defaultValue={getFormValue(name)}
        autoFocus
        sx={{
          fontSize: "30px",
        }}
        placeholder="Type your answer here..."
        {...rest}
        onChange={(event) => {
          setFormValue(name, event.target.value);
        }}
      />
    );
  }
);
