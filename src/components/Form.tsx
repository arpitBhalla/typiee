import { Box, LinearProgress, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useMemo, useRef, useState } from "react";
import { FormContext } from "../contexts/FormContext";
import { useCreateFormState } from "../hooks/form";
import { FieldRef, QuestionType } from "../types";
import { Section } from "./Section";

interface FormProps {
  questions: QuestionType[];
}

export const Form = ({ questions }: FormProps) => {
  const { setFormValue, getFormValue, getFormValues } =
    useCreateFormState(questions);
  const [questionIndex, setQuestionIndex] = useState(0);
  const totalLength = useMemo(() => questions.length, []);

  const sectionRef = useRef<FieldRef>();

  const onSubmit = () => {
    // if (!sectionRef.current!.validate()) return;
    // const { name, value, required } = sectionRef.current!.getValue();
    // setFormValue(name, value);
    // if (required && !value) return;
    setQuestionIndex((index) => index + 1);
  };

  const listener = (ev: KeyboardEvent) => {
    if (ev.code == "Enter") {
      onSubmit();
    }
  };

  const scroll = throttleFunction((e: WheelEvent) => {
    console.log("hehe", e);
  }, 1000);

  useEffect(() => {
    window.addEventListener("keydown", listener);

    window.addEventListener("wheel", scroll);

    return () => {
      window.removeEventListener("keydown", listener);
      window.removeEventListener("wheel", scroll);
    };
  }, []);

  return (
    <FormContext.Provider value={{ getFormValue, getFormValues, setFormValue }}>
      <LinearProgress
        sx={{ backgroundColor: "transparent" }}
        variant="determinate"
        value={(questionIndex * 100) / totalLength}
      />
      <Toolbar>hehe</Toolbar>
      {questionIndex < questions.length ? (
        <Section
          ref={sectionRef}
          question={questions[questionIndex]}
          onSubmit={onSubmit}
        />
      ) : (
        <>
          {JSON.stringify(getFormValues())}
          <button onClick={() => setQuestionIndex(0)}>reset</button>
        </>
      )}
    </FormContext.Provider>
  );
};

const throttleFunction = (func: Function, delay: number) => {
  let prev = 0;
  return (...args: any) => {
    let now = new Date().getTime();

    if (now - prev > delay) {
      prev = now;

      return func(...args);
    }
  };
};
