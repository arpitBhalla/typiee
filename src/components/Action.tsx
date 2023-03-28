import { CheckOutlined } from "@mui/icons-material";
import {
  Button as MuiButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
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
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const listener = (ev: KeyboardEvent) => {
      const isMeta = ev.metaKey || ev.ctrlKey;

      if (submit) {
        if (isMeta && ev.code == "Enter") {
          // buttonRef.current?.click();
          console.log("Enter+ cmd");
        }
      } else {
        if (ev.code == "Enter") {
          buttonRef.current?.click();
          console.log("Enter");
        }
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <MuiButton
        ref={buttonRef}
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
