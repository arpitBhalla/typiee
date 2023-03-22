import { Input } from "@mui/material";
import { CommonQuestionType } from "../../types";

interface InputFieldProps extends CommonQuestionType {
  onChange: (value: string) => void;
}

export const InputField = ({ onChange, ...rest }: InputFieldProps) => {
  return (
    <Input
      fullWidth
      autoFocus
      onChange={(event) => onChange(event.target.value)}
      {...rest}
    />
  );
};
