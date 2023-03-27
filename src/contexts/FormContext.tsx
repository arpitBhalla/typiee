import React from "react";
import { useCreateForm } from "../hooks/form";

type FormContextT = ReturnType<typeof useCreateForm> & {
  gotoNextQuestion: () => void;
  clearError: () => void;
};

export const FormContext = React.createContext<FormContextT>(
  {} as FormContextT
);
