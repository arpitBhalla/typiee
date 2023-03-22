import { Warning } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { QuestionType } from "../types";
import { Action } from "./Action";
import { FormField } from "./fields";
import { useForm } from "./Form";

export interface SectionRef {
  getValue: () => {
    name: string;
    value: string;
    required?: boolean;
  };
  validate: () => boolean;
}

interface SectionProps {
  question: QuestionType;
  onSubmit: () => void;
}

export const Section = forwardRef(
  (
    {
      question: { action, title, type, required, summary, name, ...rest },
      onSubmit,
    }: SectionProps,
    ref
  ) => {
    const { getFormValue } = useForm();
    const [value, setValue] = useState({ text: "", error: "" });

    const validateField = () => {
      if (required && !value.text) {
        setValue({ text: value.text, error: "Please fill this in" });
        return false;
      }
      return true;
    };

    useImperativeHandle<any, SectionRef>(ref, () => ({
      getValue: () => ({ name, value: value.text, required }),
      validate: validateField,
    }));

    useEffect(() => {
      setValue({ text: getFormValue(name), error: "" });
    }, [name]);

    return (
      <section>
        <Typography variant="subtitle1" color="textPrimary">
          {title?.replace(
            /\{\{(.*)\}\}/g,
            (_, fieldName) => getFormValue(fieldName) || ""
          )}{" "}
          {required && "*"}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {summary}
        </Typography>
        <FormField
          value={value.text || getFormValue(name)}
          onChange={(value) => setValue({ text: value, error: "" })}
          type={type}
          props={{ name, required, ...rest }}
        />
        <Action onClick={onSubmit} next={type === "input"} {...action} />
        <Box>
          {value.error ? (
            <Box
              bgcolor={red[50]}
              px={1}
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
      </section>
    );
  }
);
