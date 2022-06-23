import React from "react";
import { FormControl, FormHelperText, FormLabel, Select, SelectProps, Skeleton, styled } from "@mui/material";
import { useField } from "formik";

export interface Props<T> extends Omit<SelectProps<T>, "name"> {
  name: string;
  label?: string;
  isLoading?: boolean;
}

const FormikSelect: <T>(props: Props<T>) => JSX.Element = ({
  name,
  children,
  label,
  fullWidth,
  isLoading,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const validationError = meta.touched && Boolean(meta.error);

  const id = `formik-select-${name}`;

  return (
    <FormControl error={validationError} fullWidth={fullWidth}>
      {label && <StyledFormLabel id={id}>{label}</StyledFormLabel>}

      {isLoading ? (
        <Skeleton variant="rectangular" height={43} />
      ) : (
        <>
          <Select labelId={id} name={name} variant="outlined" {...props}>
            {children}
          </Select>
          {validationError && <FormHelperText>{meta.error}</FormHelperText>}
        </>
      )}
    </FormControl>
  );
};

const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
  cursor: "pointer",
  marginBottom: theme.spacing(1),
}));

export default FormikSelect;
