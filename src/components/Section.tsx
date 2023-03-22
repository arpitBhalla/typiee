import { Typography } from "@mui/material";
import { QuestionType } from "../types";
import { Action } from "./Action";
import { FormField } from "./fields";

export const Section = ({
  action,
  title,
  type,
  required,
  summary,
  ...rest
}: QuestionType) => {
  return (
    <section>
      <Typography variant="subtitle1" color="textPrimary">
        {title} {required && "*"}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        {summary}
      </Typography>
      <FormField type={type} props={{ required, ...rest }} />
      <Action next={type === "input"} {...action} />
    </section>
  );
};
