import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import { useEffect } from "react";

const initialValue = {
  id: "",
  title: "",
  price: 0,
  url: "",
  imageUrl: ""
};

const PromotionForm = ({ id }) => {
  //console.log(id);
  // "id": 2,
  // "title": "Faqueiro Tramontina Laguna Inox - 100 Peças",
  // "price": 246.05,
  // "url": "",
  // "imageUrl": "https://cdn.gatry.com/gatry-static/promocao/imagem/0324bf9ad81ccbc5a8e22a1a41015649.png"

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/promotions/${id}`).then(response => {
        setValue(response.data);

        //console.log(response.data);
      });
    }
  }, []);

  const [values, setValue] = useState(id ? null : initialValue);
  const navigate = useNavigate();

  function onChance(event) {
    const { name, value } = event.target;

    setValue({ ...values, [name]: value });
  }

  function onSubmit(event) {
    event.preventDefault();
    const method = id ? "put" : "post";
    const url = id
      ? `http://localhost:5000/promotions/${id}`
      : "http://localhost:5000/promotions";

    axios[method](url, values).then(response => {
      navigate("/");
    });
  }

  if (!values) {
    return <div>Carregando.....</div>;
  }

  return (
    <>
      <h1>Promo Show</h1>
      <h2>New Promotion</h2>

      <form onSubmit={onSubmit}>
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
