import {
  styled,
  Button as MuiButton,
  Input,
  Typography,
  Box,
} from "@mui/material";
import { CheckOutlined } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import Container from "@mui/material/Container";
import React from "react";

const checkedColor = grey[50];
const unCheckedColor = grey[600];

const Label = styled("label")(({ theme }) => ({
  display: "inline-flex",
  gap: 8,
  position: "relative",
  cursor: "pointer",
  padding: "6px 8px",
  border: "solid 2px",
  borderColor: unCheckedColor,
  borderRadius: 2,
  userSelect: "none",
  alignItems: "center",
  input: {
    display: "none",
  },
  "span.index": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
    height: 20,
    width: 20,
    border: "solid 2px",
    borderColor: unCheckedColor,
  },
  "span.label": {
    flex: 1,
  },
  svg: {
    display: "none",
  },
  "&:hover": {
    backgroundColor: unCheckedColor + "80",
  },
  "&:has(input:checked)": {
    animation: "blink .5s",
    borderColor: checkedColor,
    "span.index": {
      borderColor: checkedColor,
      backgroundColor: checkedColor,
      color: "black",
    },
    svg: {
      display: "block",
    },
  },
}));

interface LabeledFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "radio" | "checkbox";
  label: string;
}

const LabeledField = ({
  type = "checkbox",
  checked,
  placeholder,
  label,
  ...rest
}: LabeledFieldProps) => {
  return (
    <Label>
      <span className="index">{placeholder}</span>
      <span className="label">{label}</span>
      <input type={type} checked={checked} {...rest} />
      <CheckOutlined htmlColor="white" />
    </Label>
  );
};

const Checkbox = (props: LabeledFieldProps) =>
  React.createElement(LabeledField, {
    type: "checkbox",
    ...props,
  });

const Radio = (props: LabeledFieldProps) =>
  React.createElement(LabeledField, {
    type: "radio",
    ...props,
  });

const FormFieldContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  maxWidth: 280,
});

const FormField = ({ children }: React.PropsWithChildren) => {
  return (
    <FormFieldContainer>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement, {
          placeholder: String.fromCharCode(index + 65),
        })
      )}
    </FormFieldContainer>
  );
};

export default function Home() {
  return (
    <Container maxWidth="md">
      {questions.map((question, index) => (
        <Section {...question} key={index} />
      ))}
    </Container>
  );
}

const MultiSelectField = ({ options, maxSelect, name }: MultiSelectProps) => {
  return (
    <FormField>
      {options.map((option, index) => (
        <Checkbox name={name} label={option} key={index} />
      ))}
    </FormField>
  );
};
const SingleSelectField = ({ options, maxSelect, name }: MultiSelectProps) => {
  return (
    <FormField>
      {options.map((option, index) => (
        <Radio name={name} label={option} key={index} />
      ))}
    </FormField>
  );
};

const InputField = ({ ...rest }: CommonQuestion) => {
  return <Input fullWidth {...rest} />;
};

const QT: Record<Q["type"], any> = {
  input: InputField,
  multi: MultiSelectField,
  single: SingleSelectField,
};

const Action = ({ icon, title, next, submit }: Q["action"]) => {
  return (
    <>
      <MuiButton variant="contained" disableRipple>
        {title}
        {icon === "done" ? <CheckOutlined fontSize="small" /> : null}
      </MuiButton>
      <Typography variant="caption" color="textSecondary" sx={{ ml: 2 }}>
        Press Enter
      </Typography>
    </>
  );
};

const Section = ({ action, title, type, required, summary, ...rest }: Q) => {
  return (
    <section>
      <Typography variant="subtitle1" color="textPrimary">
        {title} {required && "*"}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        {summary}
      </Typography>
      {QT[type] &&
        React.createElement(QT[type], {
          required,
          ...rest,
        })}
      <Action {...action} />
    </section>
  );
};

interface CommonQuestion {
  title: string;
  name?: string;
  summary?: string;
  required?: boolean;
  action: {
    title: string;
    icon: "done" | "none";
    next?: boolean;
    submit?: boolean;
  };
}

interface Dropdown extends CommonQuestion {
  type: "dropdown";
  options: string[];
}

interface SingleSelect extends CommonQuestion {
  type: "single";
  options: string[];
}

interface MultiSelectProps extends CommonQuestion {
  type: "multi";
  maxSelect: number;
  options: string[];
}

interface Rest extends CommonQuestion {
  type: "info" | "input";
}

type Q = Dropdown | SingleSelect | MultiSelectProps | Rest;

const questions: Q[] = [
  {
    title: "Up-skilling requires time commitment",
    type: "info",
    summary: `The GrowthX experience is designed by keeping in mind the working hours founders & full time operators typically work in.\n\nYou will spend\n- 6 hours/week for the first 5 weeks\n- 15 hours/week for the last 3 weeks`,
    action: {
      title: "I agree",
      icon: "none",
    },
  },
  {
    title: "What's your first name?",
    required: true,
    name: "firstName",
    type: "input",
    action: {
      title: "Ok",
      icon: "done",
    },
  },
  {
    title: "and your last name, {{firstName}}?",
    required: true,
    name: "lastName",
    type: "input",
    action: {
      title: "Ok",
      icon: "done",
    },
  },
  {
    title: "What industry is your company in?",
    required: true,
    summary: "We will personalize your learning experience accordingly",
    type: "dropdown",
    action: {
      title: "Ok",
      icon: "done",
    },
    options: [
      "Founder or CXO",
      "Product team",
      "Marketing team",
      "VC",
      "Other",
    ],
  },
  {
    title: "Your role in your company?",
    summary: "We want to understand how you spend your time right now.",
    required: true,
    type: "single",
    name: "role",
    action: {
      title: "Ok",
      icon: "done",
    },
    options: [
      "Founder or CXO",
      "Product team",
      "Marketing team",
      "VC",
      "Other",
    ],
  },
  {
    title:
      "{{firstName}}, what's your professional goal for the next 12 months?",
    required: true,
    type: "multi",
    action: {
      title: "Ok",
      icon: "done",
    },
    maxSelect: 2,
    options: [
      "Get hired",
      "Get promoted",
      "Connect with like-minded people",
      "Structured approach to growth",
      "Build a growth team",
    ],
  },
  {
    type: "input",
    title: "Email you'd like to register with?",
    summary:
      "We will keep all our communications with you through this email. Do check your spam inbox if you can't find our application received email.",
    action: {
      title: "Ok",
      icon: "done",
    },
  },
  {
    // TODO
    type: "input",
    title: "Your phone number",
    summary:
      "We won't call you unless it is absolutely required to process your application.",
    action: {
      title: "Submit",
      icon: "none",
      submit: true,
    },
  },
];
