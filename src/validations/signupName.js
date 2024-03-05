import * as yup from "yup";

export const initialValues = {
  name: ""
};

export const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .label("Name")
});
