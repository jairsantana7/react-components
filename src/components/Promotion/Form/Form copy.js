import { useNavigate, Link } from "react-router-dom";
import "./Form.css";
import { useEffect, useState } from "react";
import useApi from "../utils/useApi";
import { Formik, Form, Field } from "formik";
import schema from "./schema";

const initialValue = {
  id: "",
  title: "",
  price: 0,
  url: "",
  imageUrl: ""
};

const PromotionForm = ({ id }) => {
  const [values, setValues] = useState(id ? null : initialValue);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [load, loadInfo] = useApi({
    url: `/promotions/${id}`,
    method: "get"

    // onCompleted: response => {
    //   setPromotions(response.data);
    // }
  });

  const [save, saveInfo] = useApi({
    url: id ? `promotions/${id}` : "promotions",
    method: id ? "put" : "post",
    data: values,
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

  function format(content) {
    for (let i in content) {
      content.title = content.title.toUpperCase(i);
    }

    return content;
  }

  function onSubmit(values) {
    save({ data: values });
  }

  return (
    <>
      <header className="promotions-search__header">
        <h1>Edit Promo</h1>

        <Link to="/">Home</Link>
      </header>

      {values ? (
        <div>Carregando...</div>
      ) : (
        <Formik
          initialValues={initialValue}
          validationSchema={schema}
          render={() => (
            <Form>
              {saveInfo.loading && <span>Salvando Dados</span>}
              <div className="promotion-form_group">
                <label htmlFor="title">Title</label>
                <Field type="text" name="title" id="title" />
              </div>

              <div className="promotion-form_group">
                <label htmlFor="price">Price</label>
                <Field type="text" name="price" id="title" />
              </div>

              <div className="promotion-form_group">
                <label htmlFor="url">Url</label>
                <Field type="text" name="url" id="url" />
              </div>

              <div className="promotion-form_group">
                <label htmlFor="imageUrl">imageUrl</label>
                <Field type="text" name="imageUrl" id="imageUrl" />
              </div>

              <div className="promotion-form_group">
                <button type="submit">Salvar</button>
              </div>
            </Form>
          )}
        ></Formik>
      )}
    </>
  );
};

export default PromotionForm;
