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

  const [active, setActive] = useState(true);
  const [error, setError] = useState("");

  const sectionRef = useRef<FieldRef>();
  const containerRef = useRef<HTMLDivElement>(null);

  const listener = (ev: KeyboardEvent) => {
    if (ev.code == "Enter") {
      move();
    }
  };

  const transitionRef = useRef({
    currentIndex: 0,
    totalIndex: questions.length,
    direction: "up" as "up" | "down",
    canScroll: true,
  });

  function move(diff = 1) {
    // const validationError = sectionRef.current?.validate();
    // if (diff > 0 && sectionRef.current && validationError) {
    //   console.log("invalid", validationError);
    //   setError(validationError);
    //   return;
    // } else {
    //   setError("");
    // }
    const newIndex = transitionRef.current.currentIndex + diff;
    if (newIndex < 0 || newIndex >= transitionRef.current.totalIndex) return;

    transitionRef.current.direction = diff > 0 ? "down" : "up";

    setActive(false);
    setTimeout(() => {
      transitionRef.current.currentIndex += diff;
      transitionRef.current.direction = diff < 0 ? "down" : "up";
      setActive(true);
    }, 30);
  }

  useEffect(() => {
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const currentQuestion = questions[transitionRef.current.currentIndex];

  return (
    <FormContext.Provider value={{ getFormValue, getFormValues, setFormValue }}>
      <LinearProgress
        sx={{ backgroundColor: "transparent" }}
        variant="determinate"
        value={
          (transitionRef.current.currentIndex * 100) /
          transitionRef.current.totalIndex
        }
      />
      <Toolbar sx={{ position: "fixed" }} className="renderer-in">
        <Image src="/logo.png" width={100} height={24} alt="logo" />
      </Toolbar>
      <If cond={transitionRef.current.currentIndex < questions.length}>
        <Swipe
          onSwipe={(dir) => {
            if (dir === "up") {
              containerRef.current!.style.animation = "slideIn 0.3s reverse";
            } else {
              containerRef.current!.style.animation = "slideOut 0.3s normal";
            }

            setTimeout(() => {
              move(dir === "up" ? -1 : 1);
              if (dir === "up") {
                containerRef.current!.style.animation = "slideOut 0.3s reverse";
              } else {
                containerRef.current!.style.animation = "slideIn 0.3s normal";
              }
            }, 300);
          }}
        >
          <Container ref={containerRef}>
            <Section ref={sectionRef} question={currentQuestion} />
            <If cond={!error && !!currentQuestion}>
              <Action
                onClick={move}
                next={currentQuestion?.["type"] === "input"}
                {...currentQuestion?.["action"]}
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
