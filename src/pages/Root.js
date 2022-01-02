import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PagesPromotionSearch from "./Promotion/Search/Search";
import PagesPromotionForm from "./Promotion/Form/Form";

const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PagesPromotionSearch />} />
        <Route path="/create" element={<PagesPromotionForm />} />
        <Route path="/edit/:id" element={<PagesPromotionForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
