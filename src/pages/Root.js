import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PagesPromotionForm from "./Promotion/Form/Form";
import PagesPromotionSearch from "./Promotion/Search/Search";

const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PagesPromotionSearch />} />
        <Route path="/create" element={<PagesPromotionForm />} />
        <Route path="/edit/:id" element={<PagesPromotionForm />} />
        <Route path="/delete/:id" element={<PagesPromotionForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
