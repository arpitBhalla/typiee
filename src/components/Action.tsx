import { CheckOutlined } from "@mui/icons-material";
import {
  Button as MuiButton,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { QuestionType } from "../types";
import { If } from "./ui/If";

export const Action = ({
  onClick,
  onFormSubmit,
  question: {
    type,
    action: { icon, title, next = type === "input", submit },
  },
}: {
  onClick: () => void;
  onFormSubmit: () => void;
  question: QuestionType;
}) => {
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const listener = (ev: KeyboardEvent) => {
      const isMeta = ev.metaKey || ev.ctrlKey;

      if (submit) {
        if (isMeta && ev.code == "Enter") {
          buttonRef.current?.click();
        }
      } else {
        if (ev.code == "Enter") {
          buttonRef.current?.click();
        }
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [submit]);

  return (
    <div>
      <MuiButton
        ref={buttonRef}
        disabled={loading}
        onClick={() => {
          if (submit) {
            onFormSubmit();
            setLoading(true);
          } else {
            onClick?.();
          }
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
