import { FormContext } from "@/contexts/FormContext";
import { useCreateForm } from "@/hooks/form";
import { FieldRef, QuestionType } from "@/types";
import styled from "@emotion/styled";
import {
  Container as MuiContainer,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { Action } from "./Action";
import { ErrorCard, Section } from "./Section";
import { If } from "./ui/If";

import { Swipe } from "./Swipe";

interface FormProps {
  questions: QuestionType[];
}

export const Form = ({ questions }: FormProps) => {
  const { setFormValue, getFormValue, getFormValues } =
    useCreateForm(questions);

  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);

  const questionFieldRef = useRef<FieldRef>();
  const containerRef = useRef<HTMLDivElement>(null);

  const currentQuestion = questions[index];
  const totalIndex = questions.length;

  const submitForm = () => {
    fetch("/api/email", {
      method: "POST",
      body: JSON.stringify(getFormValues(), (_key, value) =>
        value instanceof Set ? [...value].join(", ") : value
      ),
    }).then(() => {
      setIndex((prevIndex) => prevIndex + 1);
    });
  };

  const clearError = () => {
    if (error) setError("");
  };

  const onSwipeHandler = (dir: "up" | "down"): void => {
    const isUp = dir === "up";
    if (!index && isUp) return;

    // Validate the field
    const validationError = questionFieldRef.current?.validate();
    if (!isUp && questionFieldRef.current && validationError) {
      setError(validationError);
      return;
    } else {
      clearError();
    }

    // Last question of form
    if (index === totalIndex - 1 && !isUp) {
      return;
    }

    containerRef.current!.style.animationDirection = isUp
      ? "reverse"
      : "normal";
    containerRef.current!.style.animationName = isUp ? "slideIn" : "slideOut";

    setTimeout(() => {
      containerRef.current!.style.animationName = isUp ? "slideOut" : "slideIn";

      setIndex((prevIndex) => {
        const newIndex = prevIndex + (isUp ? -1 : 1);
        if (newIndex < 0 || prevIndex >= totalIndex) return prevIndex;
        return newIndex;
      });
    }, 250);
  };

  const gotoNextQuestion = () => {
    setTimeout(() => {
      onSwipeHandler("down");
    }, 500);
  };

  // Show thankyou message when form is submitted
  if (index === totalIndex) {
    return (
      <Container>
        <Typography variant="h5" color="textPrimary">
          All done! Thanks for your time.
        </Typography>
      </Container>
    );
  }

  return (
    <FormContext.Provider
      value={{
        getFormValue,
        getFormValues,
        setFormValue,
        gotoNextQuestion,
        clearError,
      }}
    >
      <LinearProgress
        sx={{ backgroundColor: "transparent" }}
        variant="determinate"
        value={(index * 100) / totalIndex}
      />

      <If cond={index < questions.length}>
        <Swipe onSwipe={onSwipeHandler}>
          <Container ref={containerRef}>
            <Section ref={questionFieldRef} question={currentQuestion} />
            <If cond={!error && !!currentQuestion}>
              <Action
                question={currentQuestion}
                onFormSubmit={submitForm}
                onClick={onSwipeHandler.bind(null, "down")}
                // next={currentQuestion?.type === "input"}
                // {...currentQuestion?.action}
              />
            </If>
            <If cond={!!error}>
              <ErrorCard value={{ error }} />
            </If>
          </Container>
        </Swipe>
      </If>
    </FormContext.Provider>
  );
};

const Container = styled(MuiContainer)({
  width: "720px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 16,
  height: "100vh",
  animationDuration: "0.3s",
  animationFillMode: "forwards",
  animationTimingFunction: "ease-out",
});
