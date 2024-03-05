import * as yup from "yup";

export const initialValues = {
  birthdate: "",
  name:""
};

export const schema = yup.object().shape({
  name: yup.string().required('Please fill in this field').label("name"),
  birthdate: yup.string().label("Birthdate"),
});
