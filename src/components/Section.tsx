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

export const ErrorCard = ({ value }: any) => {
  return (
    <Box>
      {value.error ? (
        <Box
          bgcolor={red[50]}
          padding="4px 12px 4px 8px"
          display="inline-flex"
          alignItems={"center"}
          gap={1}
          mt={1}
          borderRadius={"2px"}
        >
          <Warning htmlColor={red[800]} fontSize="small" />
          <Typography
            fontWeight={"bold"}
            variant="caption"
            color={red[800]}
            fontSize="14"
          >
            {value.error}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};
