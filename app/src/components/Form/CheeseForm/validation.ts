import * as yup from "yup";

export const createSchema = yup.object().shape({
  name: yup.string().required(),
  imageUrl: yup.string(),
  color: yup.string().required(),
  pricePerKilo: yup.number().required(),
});

export const updateSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  imageUrl: yup.string(),
  color: yup.string().required(),
  pricePerKilo: yup.number().required(),
});
