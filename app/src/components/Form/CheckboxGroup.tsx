import React from "react";
import { useField } from "formik";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material";

export interface FormikCheckboxGroupProps {
  name: string;
  label: string;
  options: { key: string; label: string }[];
  onChange?: (key: string, checked: boolean) => void;
}

const FormikCheckboxGroup = <T extends unknown[]>({ name, label, options, onChange }: FormikCheckboxGroupProps) => {
  const [field, meta, helpers] = useField<T>(name);

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup row>
        {options.map(({ key, label }) => (
          <FormControlLabel
            key={key}
            label={label}
            control={
              <Checkbox
                checked={field.value.some((v) => v === key)}
                onChange={(e) => onChange && onChange(key, e.target.checked)}
              />
            }
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default FormikCheckboxGroup;
