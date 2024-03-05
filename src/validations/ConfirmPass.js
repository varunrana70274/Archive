import * as yup from "yup";

export const initialValues = {
  conPassword: "",
  password: ""
};

export const schema = yup.object().shape({
  
  password: yup
    .string()
    .required()
    .label("Password").min(8,'At least 8 characters'),
  conPassword: yup
    .string()
    .required()
    .label("Repeat password")
    .oneOf([yup.ref('password'), null], 'Both passwords must match')
    // matches('Password','Password and confirm password should be same.'),
});
