import React, { PropsWithChildren, ReactElement } from "react";
import { Box, CircularProgress, CircularProgressProps, Typography } from "@mui/material";

export interface LoadingSpinnerProps extends PropsWithChildren<CircularProgressProps> {
  isLoading?: boolean;
  message?: string;
}

const LoadingSpinner = ({ message, isLoading, children, ...props }: LoadingSpinnerProps): ReactElement => {
  return isLoading ? (
    <Box position="relative" width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
      <CircularProgress {...props} />
      {message && (
        <Typography variant="subtitle1" color="textSecondary" style={{ marginLeft: "16px" }}>
          {message}
        </Typography>
      )}
    </Box>
  ) : (
    <>{children}</>
  );
};

export default LoadingSpinner;
