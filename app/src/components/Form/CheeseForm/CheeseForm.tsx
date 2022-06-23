import React, { ReactElement } from "react";
import { Cheese } from "@api/generated";
import { Stack } from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import FormikTextField from "@components/Form/TextField";
import SaveButton from "@components/Button/SaveButton";
import { createSchema, updateSchema } from "./validation";
import { useCreateCheese, useUpdateCheese } from "@hooks/cheese";

export interface CheeseFormProps {
  initialValues: Cheese;
  isEditing: boolean;
  onClose: () => void;
}

const CheeseForm = ({ initialValues, isEditing, onClose }: CheeseFormProps): ReactElement => {
  const { mutateAsync: createCheese } = useCreateCheese();
  const { mutateAsync: updateCheese } = useUpdateCheese();

  const formik = useFormik<Cheese>({
    initialValues: initialValues ?? ({} as Cheese),
    validationSchema: isEditing ? updateSchema : createSchema,
    onSubmit: async (cheese) => {
      try {
        const pricePerKilo = Number(cheese.pricePerKilo);
        await (isEditing ? updateCheese({ ...cheese, pricePerKilo }) : createCheese({ ...cheese, pricePerKilo }));
        onClose();
      } catch (e) {}
    },
    enableReinitialize: true,
  });

  return (
    <FormikProvider value={formik}>
      <Stack spacing={2} sx={{ minWidth: 360 }}>
        <FormikTextField label="Name" {...formik.getFieldProps("name")} />
        <FormikTextField label="Color" {...formik.getFieldProps("color")} />
        <FormikTextField label="Price Per Kilo (cents)" {...formik.getFieldProps("pricePerKilo")} />
        <FormikTextField label="Image URL" {...formik.getFieldProps("imageUrl")} />
      </Stack>
      <Stack paddingTop={3} alignItems="flex-end">
        <SaveButton isLoading={formik.isSubmitting} onClick={() => formik.handleSubmit()} />
      </Stack>
    </FormikProvider>
  );
};

export default CheeseForm;
