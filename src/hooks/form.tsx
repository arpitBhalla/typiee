import { useContext, useEffect, useRef } from "react";
import { QuestionType } from "../types";
import { FormContext } from "../contexts/FormContext";

export const useCreateForm = (questions: QuestionType[]) => {
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

export const useForm = () => useContext(FormContext);
