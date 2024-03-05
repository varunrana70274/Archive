import * as yup from "yup";

export const initialValues = {
  birthdate: "",
};

export const schema = yup.object().shape({
  birthdate: yup.string().required().label("Birthdate"),
});
