import React, { ReactElement } from "react";
import { Dialog, DialogContent, IconButton, Stack, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { Cheese } from "@api/generated";
import CheeseForm from "@components/Form/CheeseForm";

export interface CheeseModalProps {
  onClose: () => void;
  cheese: Cheese | null;
}

const CheeseDialog = ({ onClose, cheese }: CheeseModalProps): ReactElement | null => {
  const isEditing = !isNaN(Number(cheese?.id));
  return cheese ? (
    <Dialog open={true} onClose={onClose}>
      <Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" padding={3}>
          <Typography variant="h6" component="h2">
            {isEditing ? "Edit " : "Add "}Cheese
          </Typography>
          <IconButton aria-label="close" sx={{ padding: 0 }} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <DialogContent sx={{ paddingTop: 0 }}>
          <CheeseForm initialValues={cheese} isEditing={isEditing} onClose={onClose} />
        </DialogContent>
      </Stack>
    </Dialog>
  ) : null;
};

export default CheeseDialog;
