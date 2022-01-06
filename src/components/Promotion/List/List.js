import React from "react";
import PromotionCard from "../Card/Card";
import "./List.css";
import UIModal from "components/UI/Modal/Modal";
import { useState } from "react";

const PromotionList = ({ loading, error, promotions }) => {
  const [promotionId, setPromotionId] = useState(null);
  if (error) {
    return <div> Algo deu errado </div>;
  }

  if (loading || promotions === null) {
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

      <UIModal
        isOpen={Boolean(promotionId)}
        onClickClose={() => {
          setPromotionId(null);
        }}
      >
        <h1>Comentários</h1>
      </UIModal>
    </div>
  );
};

export default PromotionList;
