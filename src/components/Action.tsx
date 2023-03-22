import { CheckOutlined } from "@mui/icons-material";
import { Button as MuiButton, Typography } from "@mui/material";
import { CommonQuestionType } from "../types";

export const Action = ({
  icon,
  title,
  next,
  submit,
}: CommonQuestionType["action"]) => {
  return (
    <>
      <MuiButton variant="contained" disableRipple>
        {title}
        {icon === "done" ? <CheckOutlined fontSize="small" /> : null}
      </MuiButton>
      {next || submit ? (
        <Typography variant="caption" color="textSecondary" sx={{ ml: 2 }}>
          {next ? "Press Enter ↵" : ""}
          {submit ? "press Cmd ⌘ + Enter ↵" : ""}
        </Typography>
      ) : null}
    </>
  );
};
