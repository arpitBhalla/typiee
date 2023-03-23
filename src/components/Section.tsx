import { Warning } from "@mui/icons-material";
import { Box, Container, Typography, Grid } from "@mui/material";
import { red } from "@mui/material/colors";
import { forwardRef } from "react";
import { QuestionType } from "../types";
import { Action } from "./Action";
import { FormField } from "./fields";
import { useForm } from "../hooks/form";

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

    return (
      <Container
        maxWidth="sm"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h5" color="textPrimary">
          {title?.replace(
            /\{\{(.*)\}\}/g,
            (_, fieldName) => getFormValue(fieldName) || ""
          )}{" "}
          {required && "*"}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {summary}
        </Typography>
        <FormField type={type} ref={ref} props={{ name, required, ...rest }} />
        <Action onClick={onSubmit} next={type === "input"} {...action} />
        {/* <Error value={{}} /> */}
      </Container>
    );
  }
);

// const Error = ({ value }) => {
//   return (
//     <Box>
//       {value.error ? (
//         <Box
//           bgcolor={red[50]}
//           px={1}
//           py={0.5}
//           display="inline-flex"
//           alignItems={"center"}
//           gap={1}
//           mt={1}
//         >
//           <Warning htmlColor={red[500]} fontSize="small" />
//           <Typography fontWeight={"bold"} variant="caption" color="error">
//             {value.error}
//           </Typography>
//         </Box>
//       ) : null}
//     </Box>
//   );
// };
