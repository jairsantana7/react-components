import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PromotionList from "../List/List";
import "./Serach.css";

import axios from "axios";

const PromotionSearch = () => {
  const [promotions, setPromotions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = {};
    if (search) {
      params.title_like = search;
    }
    axios
      .get("http://localhost:5000/promotions?_embed=comments", { params })
      .then(response => {
        setPromotions(response.data);
      });
  }, [search]);

  return (
    <div className="promotion-search">
      <header className="promotions-search__header">
        <h1>Promo Show</h1>
        <Link to="/create">New Promotion</Link>
      </header>

      <label htmlFor="title">Título</label>

      <input
        id="title"
        className="promotions-search__input"
        placeholder="Buscar"
        value={search}
        onChange={event => {
          setSearch(event.target.value);
        }}
        type="search"
      />

      <PromotionList promotions={promotions} loading={!promotions.length} />
    </div>
  );
};

export default PromotionSearch;
