import { useNavigate, Link } from "react-router-dom";
import "./Form.css";
import { useEffect } from "react";
import useApi from "../utils/useApi";
import { Formik, Form } from "formik";
import schema from "./schema";
import FormField from "components/Form/Field/Field";
import UIButon from "components/UI/Button/Button";

const initialValue = {
  id: "",
  title: "",
  price: 0,
  url: "",
  imageUrl: ""
};

const PromotionForm = ({ id }) => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [load, loadInfo] = useApi({
    url: `/promotions/${id}`,
    method: "get"
  });

  const [save, saveInfo] = useApi({
    url: id ? `/promotions/${id}` : "/promotions",
    method: id ? "put" : "post",
    data: id ? null : initialValue,
    onCompleted: response => {
      if (!response.error) {
        navigate("/");
      }
    }
  });

  useEffect(() => {
    if (id) {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function onSubmit(formvalues) {
    save({ data: formvalues });
  }

  const values = id ? loadInfo.data : initialValue;
  //id ? null : initialValue
  return (
    <>
      <header className="promotions-search__header">
        <h1>Edit Promo</h1>

        <UIButon to="/" component={Link}>
          Home
        </UIButon>
      </header>

      {!values ? (
        <div>Carregando.....</div>
      ) : (
        <Formik
          initialValues={values}
          validationSchema={schema}
          onSubmit={onSubmit}
        >
          {({ errors }) => {
            return (
              <Form>
                {saveInfo.loading && <span>Salvando Dados</span>}
                <div className="promotion-form_group">
                  <FormField name="title" type="text" label="Title" />
                  {errors.title ? <span>{errors.title}</span> : null}
                </div>

                <div className="promotion-form_group">
                  <FormField name="price" type="text" label="Price" />
                  {errors.price ? <span>{errors.price}</span> : null}
                </div>

                <div className="promotion-form_group">
                  <FormField
                    name="url"
                    type="text"
                    label="Url (Link do produto)"
                  />
                  {errors.url ? <span>{errors.url}</span> : null}
                </div>

                <div className="promotion-form_group">
                  <FormField
                    name="imageUrl"
                    type="text"
                    label="Url da Imagem"
                  />
                  {errors.imageUrl ? <span>{errors.imageUrl}</span> : null}
                </div>

                <UIButon
                  className={"send"}
                  theme={"contained-green"}
                  component="button"
                  type="submit"
                >
                  Salvar
                </UIButon>
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default PromotionForm;
