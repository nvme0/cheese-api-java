import React from "react";
import { Save as SaveIcon } from "@mui/icons-material";

import LoadingButton, { Props as LoadingButtonProps } from "./LoadingButton";

const SaveButton = (
  props: Omit<LoadingButtonProps, "type" | "variant" | "color" | "children" | "startIcon" | "aria-label">,
) => {
  return (
    <LoadingButton
      aria-label="save"
      type="submit"
      variant="contained"
      color="primary"
      startIcon={<SaveIcon />}
      {...props}
    >
      Save
    </LoadingButton>
  );
};

export default SaveButton;
