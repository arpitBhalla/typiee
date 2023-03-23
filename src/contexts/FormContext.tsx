import React from "react";
import { useCreateFormState } from "../hooks/form";

type FormContextT = ReturnType<typeof useCreateFormState>;

export const FormContext = React.createContext<FormContextT>(
  {} as FormContextT
);
