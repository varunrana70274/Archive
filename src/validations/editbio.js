import * as yup from "yup";

export const initialValues = {
  bio: "",
};

export const schema = yup.object().shape({
  bio: yup.string().required().label("Bio"),
});
