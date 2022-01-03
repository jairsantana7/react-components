import React from "react";
import "./Form.css";

const PromotionForm = ({ promotion }) => (
  <>
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
    </div>
  </>
);

export default PromotionForm;
