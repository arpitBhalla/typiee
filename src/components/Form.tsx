import styled from "@emotion/styled";
import {
  Container as MuiContainer,
  LinearProgress,
  Slide,
  Toolbar,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { FormContext } from "../contexts/FormContext";
import { useCreateForm } from "../hooks/form";
import { FieldRef, QuestionType } from "../types";
import { Action } from "./Action";
import { ErrorCard, Section } from "./Section";
import { If } from "./ui/If";

interface FormProps {
  questions: QuestionType[];
}

export const Form = ({ questions }: FormProps) => {
  const { setFormValue, getFormValue, getFormValues } =
    useCreateForm(questions);

  const [active, setActive] = useState(true);
  const [error, setError] = useState("");

  const sectionRef = useRef<FieldRef>();

  console.log(getFormValues());

  const onSubmit = () => {
    if (sectionRef.current) {
      const { name, value } = sectionRef.current!.getValue();
      setFormValue(name, value);
    }
    move();
  };

  const listener = (ev: KeyboardEvent) => {
    // if(error){

    // }
    if (ev.code == "Enter") {
      onSubmit();
    }
  };

  const transitionRef = useRef({
    currentIndex: 0,
    totalIndex: questions.length,
    direction: "up" as "up" | "down",
    canScroll: true,
  });

  const scroll = (ev: WheelEvent) => {
    const absDeltaY = Math.abs(ev.deltaY);
    if (transitionRef.current.canScroll && absDeltaY > 4) {
      const diff = Math.sign(ev.deltaY);
      move(diff);
      transitionRef.current.canScroll = false;
    }
    if (absDeltaY < 4) {
      transitionRef.current.canScroll = true;
    }
  };

  function move(diff = 1) {
    const validationError = sectionRef.current?.validate();
    if (diff > 0 && sectionRef.current && validationError) {
      console.log("invalid", validationError);
      setError(validationError);
      return;
    } else {
      setError("");
    }
    const newIndex = transitionRef.current.currentIndex + diff;
    if (newIndex < 0 || newIndex >= transitionRef.current.totalIndex) return;

    transitionRef.current.direction = diff > 0 ? "down" : "up";

    setActive(false);
    setTimeout(() => {
      transitionRef.current.currentIndex += diff;
      transitionRef.current.direction = diff < 0 ? "down" : "up";
      setActive(true);
    }, 300);
  }

  useEffect(() => {
    window.addEventListener("keydown", listener);
    window.addEventListener("wheel", scroll);

    return () => {
      window.removeEventListener("keydown", listener);
      window.removeEventListener("wheel", scroll);
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
      <Toolbar sx={{ position: "fixed" }}></Toolbar>
      <If cond={transitionRef.current.currentIndex < questions.length}>
        <Slide
          in={active}
          mountOnEnter
          unmountOnExit
          direction={transitionRef.current.direction}
        >
          <Container>
            <Section ref={sectionRef} question={currentQuestion} />
            <If cond={!error}>
              <Action
                onClick={onSubmit}
                next={currentQuestion["type"] === "input"}
                {...currentQuestion["action"]}
              />
            </If>
            <If cond={!!error}>
              <ErrorCard value={{ error }} />
            </If>
          </Container>
        </Slide>
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
});
