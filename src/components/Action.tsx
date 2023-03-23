import { CheckOutlined, KeyboardReturn } from "@mui/icons-material";
import { Button as MuiButton, Typography } from "@mui/material";
import { CommonQuestionType } from "../types";

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
          {next ? (
            <>
              Press <b>Enter</b> ↵
            </>
          ) : null}
          {submit ? "press Cmd ⌘ + Enter ↵" : ""}
        </Typography>
      ) : null}
    </div>
  );
};
