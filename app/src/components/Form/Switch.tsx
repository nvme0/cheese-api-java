import React from "react";
import { FormControl, FormLabel, Switch, styled } from "@mui/material";
import { useField } from "formik";

export interface SwitchProps {
  name: string;
  label: string;
  disabled?: boolean;
}

const FormikSwitch = ({ name, label, disabled }: SwitchProps) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (e, checked: boolean) => {
    helpers.setValue(checked);
  };

  const id = `formik-switch-${name}`;

  return (
    <FormControl>
      <StyledFormLabel htmlFor={id}>{label}</StyledFormLabel>
      <Switch id={id} checked={field.value} onChange={handleChange} name="darkMode" disabled={disabled} />
    </FormControl>
  );
};

const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
  cursor: "pointer",
  marginBottom: theme.spacing(1),
}));

export default FormikSwitch;
