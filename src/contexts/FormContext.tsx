import React from "react";
import { useCreateForm } from "../hooks/form";

type FormContextT = ReturnType<typeof useCreateForm>;

export const FormContext = React.createContext<FormContextT>(
  {} as FormContextT
);
