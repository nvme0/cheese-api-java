import React from "react";
import { FormControl, FormLabel, TextField, TextFieldProps, styled } from "@mui/material";
import { useField } from "formik";
import { Skeleton } from "@mui/material";

export interface FormikTextFieldProps extends Omit<TextFieldProps, "name"> {
  name: string;
  isLoading?: boolean;
}

const FormikTextField = ({
  label,
  name,
  helperText,
  fullWidth,
  isLoading,
  multiline,
  ...props
}: FormikTextFieldProps) => {
  const [field, meta, helpers] = useField(name);
  const validationError = meta.touched && Boolean(meta.error);
  const getSkeletonHeight = () => {
    if (multiline) {
      const rows = Number(props.rows);
      const multiplier = isNaN(rows) ? 1 : rows;
      return 37 + multiplier * 19;
    }
    return 43;
  };

  const id = `formik-text-field-${name}`;

  return (
    <FormControl error={validationError} fullWidth={fullWidth}>
      <StyledFormLabel htmlFor={id}>{label}</StyledFormLabel>
      {isLoading ? (
        <Skeleton variant="rectangular" height={getSkeletonHeight()} />
      ) : (
        <TextField
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && Boolean(meta.error) ? meta.error : helperText}
          multiline={multiline}
          variant="outlined"
          {...field}
          {...props}
          id={id}
        />
      )}
    </FormControl>
  );
};

const StyledFormLabel = styled(FormLabel)({
  cursor: "pointer",
});

export default FormikTextField;
