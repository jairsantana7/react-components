import React from "react";
import PromotionCard from "../Card/Card";
import "./List.css";
import { useState } from "react";
import PromotionModal from "../Modal/Modal";

const PromotionList = ({ loading, error, promotions }) => {
  const [promotionId, setPromotionId] = useState(null);
  if (error) {
    return <div> Algo deu errado </div>;
  }

  if (promotions === null) {
    return <div>Carregando....</div>;
  }

  if (promotions.length === 0) {
    return <div> Nenhum resultado encontrado</div>;
  }

  return (
    <div className="promotion-list">
      {promotions.map((promotion, i) => (
        <PromotionCard
          key={i}
          promotion={promotion}
          onClickComments={() => {
            setPromotionId(promotion.id);
          }}
        />
      ))}
      {loading && <div>Carregando mais promoções....</div>}

      {promotionId && (
        <PromotionModal
          promotionId={promotionId}
          onClickClose={() => setPromotionId(null)}
        />
      )}
    </div>
  );
};

export default PromotionList;
