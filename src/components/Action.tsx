import { CheckOutlined } from "@mui/icons-material";
import {
  Button as MuiButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <MuiButton
        disabled={loading}
        onClick={() => {
          onClick?.();
          if (submit) setLoading(true);
        }}
        variant="contained"
        disableRipple
      >
        <Typography variant="body1" color="textPrimary">
          <b>{title}</b>
        </Typography>
        {icon === "done" ? <CheckOutlined fontSize="small" /> : null}
        <If cond={loading}>
          <CircularProgress size={16} sx={{ ml: 1 }} color="inherit" />
        </If>
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
