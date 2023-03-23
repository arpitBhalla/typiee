// @ts-nocheck

import { Warning } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { forwardRef } from "react";
import { useForm } from "../hooks/form";
import { QuestionType } from "../types";
import { FormField } from "./fields";

interface SectionProps {
  question: QuestionType;
}

export const Section = forwardRef(
  (
    {
      question: { action, title, type, required, summary, name, ...rest },
    }: SectionProps,
    ref
  ) => {
    const { getFormValue } = useForm();

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography fontSize={"24px"} color="textPrimary">
          {title?.replace(
            /\{\{(.*)\}\}/g,
            (_, fieldName) => getFormValue(fieldName) || ""
          )}{" "}
          {required && "*"}
        </Typography>
        <Typography
          lineHeight="28px"
          whiteSpace="pre-wrap"
          fontSize="20px"
          color="textSecondary"
        >
          {summary}
        </Typography>
        <FormField type={type} ref={ref} props={{ name, required, ...rest }} />
      </Box>
    );
  }
);

export const ErrorCard = ({ value }) => {
  return (
    <Box>
      {value.error ? (
        <Box
          bgcolor={red[50]}
          px={1}
          pr={2}
          py={0.5}
          display="inline-flex"
          alignItems={"center"}
          gap={1}
          mt={1}
        >
          <Warning htmlColor={red[500]} fontSize="small" />
          <Typography fontWeight={"bold"} variant="caption" color="error">
            {value.error}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};
