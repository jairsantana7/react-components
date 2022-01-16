import { Link } from "react-router-dom";
import "./Card.css";
import UIButon from "components/UI/Button/Button";

const PromotionCard = ({ promotion, onClickComments }) => (
  <>
    <div className="promotion-card">
      <img src={promotion.imageUrl} alt="" className="promotion-card__image" />

      <div className="promotion-card__info">
        <h1 className="promotion-card__title">{promotion.title}</h1>
        <span className="promotion-card__price">R$ {promotion.price}</span>

        <footer className="promotion-card__footer">
          {promotion.comments.length > 0 && (
            <div className="promotion-card__comment">
              {promotion.comments[0].comment}
            </div>
          )}

          <button
            className="promotion-card__link"
            onClick={onClickComments}
            className="promotion-card__comments-count"
          >
            {promotion.comments.length}{" "}
            {promotion.comments.length > 1 ? "Comentários" : "Comentário"}
          </button>

          <UIButon
            component="a"
            href={promotion.url}
            target="_blank"
            rel="noreferrer"
          >
            Ir para o site
          </UIButon>

          <UIButon to={`/edit/${promotion.id}`} component={Link}>
            Editar
          </UIButon>

          <UIButon to={`/delete/${promotion.id}`} component={Link}>
            Delete
          </UIButon>
        </footer>
      </div>
    </div>
  </>
);

export default PromotionCard;
