import * as yup from "yup";

export default yup.object().shape({
  title: yup.string().required("Esse campos é obrigatório"),
  price: yup
    .number()
    .required("Esse campos é obrigatório")
    .positive("precisa ser um valor acima de 0"),
  imageUrl: yup
    .string()
    .url("Url deve ser válida")
    .required("Esse campos é obrigatório"),
  url: yup
    .string()
    .url("Url deve ser válida")
    .required("Esse campos é obrigatório")
});
