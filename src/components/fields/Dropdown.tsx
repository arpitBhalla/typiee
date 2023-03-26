import { a } from "@/a";
import { CloseOutlined, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, IconButton, styled, TextField } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "../../hooks/form";
import { CommonQuestionType, FieldRef } from "../../types";
import { If } from "../ui/If";
import { Radio } from "../ui/Radio";

export interface DropdownProps extends CommonQuestionType {
  type: "single";
  options: string[];
}

export const DropdownField = forwardRef(
  ({ name, required, options: defaultOptions = a }: DropdownProps, ref) => {
    const { getFormValue, setFormValue, gotoNextQuestion } = useForm();
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<string[]>(defaultOptions);

    useImperativeHandle<any, FieldRef>(ref, () => ({
      validate: () => {
        if (required && !getFormValue(name)) {
          return "Required";
        }
        return undefined;
      },
    }));

    useEffect(() => {
      setValue(getFormValue(name));
    }, [name]);

    return (
      <Box position={"relative"}>
        <TextField
          fullWidth
          variant="standard"
          value={value}
          autoComplete="off"
          onChange={(e) => {
            setValue(e.target.value);
            const filteredOptions = defaultOptions.filter((option) =>
              option.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setOptions(filteredOptions);
          }}
          placeholder="Type your answer here..."
          InputProps={{
            onFocus: () => {
              setOpen(true);
            },
            endAdornment: (
              <IconButton
                aria-label="open"
                size="small"
                onClick={() => {
                  if (value) {
                    setValue("");
                    setOptions(defaultOptions);
                    setFormValue(name, "");
                  } else {
                    setOpen(!open);
                  }
                }}
              >
                <If cond={!value && !open}>
                  <ExpandMore />
                </If>
                <If cond={!value && open}>
                  <ExpandLess />
                </If>
                <If cond={!!value}>
                  <CloseOutlined />
                </If>
              </IconButton>
            ),
          }}
          inputProps={{ style: { fontSize: "28px" } }}
        />
        <DropDown
          onWheel={(e) => e.stopPropagation()}
          sx={{
            display: open ? "block" : "none",
            bgcolor: "background.paper",
            py: 1,
          }}
        >
          {options.map((option, index) => (
            <Radio
              key={index}
              labelStyle={{ width: "100%", marginBottom: 4 }}
              noPlaceholder
              name={name}
              label={option}
              value={option}
              defaultChecked={option === getFormValue(name)}
              onChange={(ev) => {
                setValue(ev.target.value);
                setFormValue(name, ev.target.value);
                gotoNextQuestion();
              }}
            />
          ))}
        </DropDown>
      </Box>
    );
  }
);

const DropDown = styled("div")({
  zIndex: 1,
  position: "absolute",
  maxHeight: "300px",
  overflowY: "scroll",
  borderBottom: "dashed 2px white",
  width: "100%",
});
