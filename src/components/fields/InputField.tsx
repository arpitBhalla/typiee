import { Input } from "@mui/material";
import { CommonQuestionType } from "../../types";

export const InputField = ({ ...rest }: CommonQuestionType) => {
  return <Input fullWidth {...rest} />;
};
