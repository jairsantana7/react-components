import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PromotionList from "../List/List";
import "./Serach.css";
import useApi from "../utils/useApi";

const PromotionSearch = () => {
  const [search, setSearch] = useState("");
  const [load, loadInfo] = useApi({
    url: "/promotions",
    method: "get",
    params: {
      _embed: "comments",
      _order: "desc",
      _sort: "id",
      title_like: search || undefined
    }

    // onCompleted: response => {
    //   setPromotions(response.data);
    // }
  });

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      <PromotionList
        promotions={loadInfo.data}
        loading={loadInfo.loading}
        error={loadInfo.error}
      />
    </div>
  );
};

export default PromotionSearch;
