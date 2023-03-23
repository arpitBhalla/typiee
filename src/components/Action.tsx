import { CheckOutlined } from "@mui/icons-material";
import { Button as MuiButton, Typography } from "@mui/material";
import { CommonQuestionType } from "../types";
import { If } from "./ui/If";

export const Action = ({
  icon,
  title,
  next,
  submit,
  onClick,
}: CommonQuestionType["action"] & {
  onClick: any;
}) => {
  return (
    <div>
      <MuiButton onClick={onClick} variant="contained" disableRipple>
        <Typography variant="body1" color="textPrimary">
          <b>{title}</b>
        </Typography>
        {icon === "done" ? <CheckOutlined fontSize="small" /> : null}
      </MuiButton>
      {next || submit ? (
        <Typography variant="caption" color="textPrimary" sx={{ ml: 2 }}>
          <If cond={next && !submit}>
            Press <b>Enter</b> ↵
          </If>
          <If cond={submit}>press Cmd ⌘ + Enter ↵</If>
        </Typography>
      ) : null}
    </div>
  );
};
