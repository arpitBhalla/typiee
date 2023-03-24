import { FormContext } from "@/contexts/FormContext";
import { useCreateForm } from "@/hooks/form";
import { FieldRef, QuestionType } from "@/types";
import styled from "@emotion/styled";
import {
  Container as MuiContainer,
  LinearProgress,
  Toolbar,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    const listener = (ev: KeyboardEvent) => {
      if (ev.code == "Enter") {
        onSwipeHandler("down");
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const currentQuestion = questions[index];
  const totalIndex = questions.length;

  const onSwipeHandler = (dir: "up" | "down"): void => {
    const isUp = dir === "up";
    if (!index && isUp) return;

    const validationError = questionFieldRef.current?.validate();
    if (!isUp && questionFieldRef.current && validationError) {
      console.log("invalid", validationError);
      setError(validationError);
      return;
    } else {
      setError("");
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

  return (
    <FormContext.Provider value={{ getFormValue, getFormValues, setFormValue }}>
      <LinearProgress
        sx={{ backgroundColor: "transparent" }}
        variant="determinate"
        value={(index * 100) / totalIndex}
      />
      <Toolbar sx={{ position: "fixed" }} className="renderer-in">
        <Image src="/logo.png" width={100} height={24} alt="logo" />
      </Toolbar>
      <If cond={index < questions.length}>
        <Swipe onSwipe={onSwipeHandler}>
          <Container ref={containerRef}>
            <Section ref={questionFieldRef} question={currentQuestion} />
            <If cond={!error && !!currentQuestion}>
              <Action
                onClick={() => onSwipeHandler("down")}
                next={currentQuestion?.type === "input"}
                {...currentQuestion?.action}
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
