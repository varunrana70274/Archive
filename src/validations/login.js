import * as yup from "yup";

export const initialValues = {
  email: "",
  password: ""
};

export const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email format is incorrect')
    .required()
    .label("Email"),
  password: yup
    .string()
    .required()
    .label("Password")
});
