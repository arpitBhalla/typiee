import { Input } from "@mui/material";
import { Box } from "@mui/system";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useForm } from "../../hooks/form";
import { CommonQuestionType, FieldRef } from "../../types";
import { If } from "../ui/If";
import { PhoneCountryPicker } from "../ui/PhoneCountryPicker";

interface InputFieldProps extends CommonQuestionType {
  type: "email";
}

export const InputField = forwardRef(
  ({ required, name, type, validation, ...rest }: InputFieldProps, ref) => {
    const { getFormValue, setFormValue, clearError } = useForm();
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle<any, FieldRef>(ref, () => ({
      validate: () => {
        if (required && !getFormValue(name)) {
          return "Please fill this in";
        }
        switch (validation) {
          case "email":
            if (!getFormValue(name).match(/^[^\s@+]+@[^\s@]+\.[^\s@]+$/)) {
              return "Please enter a valid email address";
            }
            break;
          case "phone":
            if (!getFormValue(name).match(/^(\d){10}$/)) {
              return "Hmm... that phone number doesn't look right";
            }
            break;
        }

        return undefined;
      },
    }));

    useEffect(() => {
      inputRef.current?.focus();
      inputRef.current!.value = getFormValue(name);
    }, [name]);

    return (
      <Box display={"flex"}>
        <If cond={validation === "phone"}>
          <PhoneCountryPicker
            defaultValue={getFormValue("__phone-code") as any}
            onChange={(phoneCode) =>
              setFormValue("__phone-code", phoneCode as any)
            }
          />
        </If>
        <Input
          fullWidth
          inputRef={inputRef}
          sx={{ fontSize: "30px" }}
          placeholder="Type your answer here..."
          {...rest}
          onChange={(event) => {
            setFormValue(name, event.target.value);
            clearError();
          }}
        />
      </Box>
    );
  }
);
