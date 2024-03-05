import * as yup from "yup";

export const initialValues = {
  email: "",
};

export const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email format is incorrect')
    .required()
    .label("Email")
 
});
