import * as yup from "yup";

export const initialValues = {
  code: "",
};

export const schema = yup.object().shape({
  code: yup
    .string()
    .required()
    .label("code")
 
});
