import * as yup from "yup";

export const initialValues = {
  password: ""
};

export const schema = yup.object().shape({
  password: yup
    .string()
    .required()
    .label("Password")
});
