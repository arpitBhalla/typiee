import React, { useEffect, useRef } from "react";
import { QuestionType } from "../types";
import { Section, SectionRef } from "./Section";

const useCreateFormState = (questions: QuestionType[]) => {
  const formRef = useRef<Record<string, string>>();

  useEffect(() => {
    formRef.current = questions.reduce(
      (prev, { name }) => ({ ...prev, [name]: "" }),
      {}
    );
  }, questions);

  const getFormValues = () => formRef.current;

  const getFormValue = (name: string) => formRef.current?.[name] || "";

  const setFormValue = (name: string, value: string) => {
    formRef.current![name] = value;
  };

  return { getFormValue, setFormValue, getFormValues };
};

type FormContextT = ReturnType<typeof useCreateFormState>;

const FormContext = React.createContext<FormContextT>({} as FormContextT);

interface FormProps {
  questions: QuestionType[];
}

export const Form = ({ questions }: FormProps) => {
  const { setFormValue, getFormValue, getFormValues } =
    useCreateFormState(questions);
  const [questionIndex, setQuestionIndex] = React.useState(0);

  const sectionRef = useRef<SectionRef>();

  const onSubmit = () => {
    if (!sectionRef.current!.validate()) return;
    const { name, value, required } = sectionRef.current!.getValue();
    setFormValue(name, value);
    if (required && !value) return;
    setQuestionIndex((index) => index + 1);
  };

  const listener = (ev: KeyboardEvent) => {
    if (ev.code == "Enter") {
      onSubmit();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", listener);

    return () => window.removeEventListener("keydown", listener);
  }, []);

  return (
    <FormContext.Provider value={{ getFormValue, getFormValues, setFormValue }}>
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

export const useForm = () => React.useContext(FormContext);
