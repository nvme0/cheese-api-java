import React from "react";
import { Button, ButtonProps, CircularProgress, useTheme } from "@mui/material";

export interface Props extends ButtonProps {
  isLoading: boolean;
  component?: "label";
}

const LoadingButton = ({ isLoading, style, disabled, children, className, ...props }: Props) => {
  const theme = useTheme();

  const getCircularProgressColor = () => {
    switch (props.color) {
      case "primary":
        if (props.variant === "contained") {
          return theme.palette.primary.contrastText;
        }
        return theme.palette.text.primary;

      case "secondary":
        if (props.variant === "contained") {
          return theme.palette.secondary.contrastText;
        }
        return theme.palette.text.primary;

      default:
        return theme.palette.text.primary;
    }
  };

  return (
    <Button
      disabled={disabled || isLoading}
      style={{
        color: isLoading ? "transparent" : undefined,
        ...style,
      }}
      {...props}
      className={className}
      sx={{ whitSpace: "nowrap" }}
    >
      {children}
      {isLoading && (
        <CircularProgress
          size="1.5rem"
          sx={{
            color: getCircularProgressColor(),
            position: "absolute",
          }}
        />
      )}
    </Button>
  );
};

export default LoadingButton;
