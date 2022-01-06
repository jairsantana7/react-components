import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Form.css";
import { useEffect } from "react";
import useApi from "../utils/useApi";

const initialValue = {
  id: "",
  title: "",
  price: 0,
  url: "",
  imageUrl: ""
};

const PromotionForm = ({ id }) => {
  const [values, setValue] = useState(id ? null : initialValue);
  const navigate = useNavigate();
  const [load, loadInfo] = useApi({
    url: `/promotions/${id}`,
    method: "get",

    onCompleted: response => {
      setValue(response.data);
    }

    // onCompleted: response => {
    //   setPromotions(response.data);
    // }
  });

  const [save, saveInfo] = useApi({
    url: id
      ? `http://localhost:5000/promotions/${id}`
      : "http://localhost:5000/promotions",
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

  function onChance(event) {
    const { name, value } = event.target;

    setValue({ ...values, [name]: value });
  }

  function format(content) {
    for (let i in content) {
      content.title = content.title.toUpperCase();
    }

    return content;
  }

  function onSubmit(event) {
    event.preventDefault();
    save({ data: format(values) });
  }

  if (!values) {
    return <div>Carregando.....</div>;
  }

  return (
    <>
      <header className="promotions-search__header">
        <h1>Edit Promo</h1>

        <Link to="/">Home</Link>
      </header>

      <nav></nav>

      <form onSubmit={onSubmit}>
        {saveInfo.loading && <span>Salvando Dados</span>}
        <div className="promotion-form_group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={onChance}
            value={values.title}
          />
        </div>

        <div className="promotion-form_group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="title"
            onChange={onChance}
            value={values.price}
          />
        </div>

        <div className="promotion-form_group">
          <label htmlFor="url">Url</label>
          <input
            type="text"
            name="url"
            id="url"
            onChange={onChance}
            value={values.url}
          />
        </div>

        <div className="promotion-form_group">
          <label htmlFor="imageUrl">imageUrl</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            onChange={onChance}
            value={values.imageUrl}
          />
        </div>

        <div className="promotion-form_group">
          <button type="submit">Salvar</button>
        </div>
      </form>
    </>
  );
};

export default PromotionForm;
