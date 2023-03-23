import styled from "@emotion/styled";
import {
  Box,
  LinearProgress,
  Slide,
  Toolbar,
  Button,
  Container as MuiContainer,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { FormContext } from "../contexts/FormContext";
import { useCreateForm } from "../hooks/form";
import { FieldRef, QuestionType } from "../types";
import { Section } from "./Section";

interface FormProps {
  questions: QuestionType[];
}

export const Form = ({ questions }: FormProps) => {
  const { setFormValue, getFormValue, getFormValues } =
    useCreateForm(questions);
  const [questionIndex, setQuestionIndex] = useState(0);
  const totalLength = useMemo(() => questions.length, []);
  const [active, setActive] = useState(true);
  const [transitionDir, setTransitionDir] = useState<"up" | "down">("up");

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

  const scrolledRef = useRef(true);

  const scroll = (ev: WheelEvent) => {
    const absDeltaY = Math.abs(ev.deltaY);
    if (scrolledRef.current && absDeltaY > 4) {
      const diff = Math.sign(ev.deltaY);
      if (diff > 0) setTransitionDir("down");
      else setTransitionDir("up");

      setActive(false);
      setTimeout(() => {
        setQuestionIndex((index) => {
          const newIndex = index + diff;
          if (newIndex < 0 || newIndex >= totalLength) return index;
          return index + diff;
        });
        if (diff < 0) setTransitionDir("down");
        else setTransitionDir("up");
        setActive(true);
      }, 300);

      scrolledRef.current = false;
    }
    if (absDeltaY < 4) {
      scrolledRef.current = true;
    }
  };

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
      <Toolbar sx={{ position: "fixed" }}></Toolbar>
      {questionIndex < questions.length ? (
        <Slide
          in={active}
          mountOnEnter
          unmountOnExit
          direction={transitionDir}
          // direction={active ? "down" : "up"}
        >
          <Container>
            <Section
              ref={sectionRef}
              question={questions[questionIndex]}
              onSubmit={onSubmit}
            />
          </Container>
        </Slide>
      ) : (
        <>
          {JSON.stringify(getFormValues())}
          <button onClick={() => setQuestionIndex(0)}>reset</button>
        </>
      )}
    </FormContext.Provider>
  );
};

const Container = styled(MuiContainer)({
  width: "720px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 2,
  height: "100vh",
});
