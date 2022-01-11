import react from "react";
import "./CommentsTree.css";

const CommentsTree = ({ comments }) => {
  //console.log(comments.data);

  if (!comments) {
    return <div>Carregando...</div>;
  }
  return (
    <ul className="promotion-modal-comments-tree">
      {comments.map(function (item, key) {
        return (
          <li key={key} className="promotion-modal-comments-tree__item">
            <img
              className="promotion-modal-comments-tree__item__avatar"
              src={item.user.avatarUrl}
              alt={item.user.name}
            />
            <div className="promotion-modal-comments-tree__item__info">
              <p className="">{item.comment} </p>
            </div>
            <span className="promotion-modal-comments-tree__item__name">
              {item.user.name}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default CommentsTree;
