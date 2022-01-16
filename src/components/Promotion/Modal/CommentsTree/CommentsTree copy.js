import react from "react";
import "./CommentsTree.css";
import { useState, useMemo } from "react";

function getTree(list) {
  const roots = [];
  const childrenByParentId = {};
  if (!list) {
    return;
  }
  list.forEach(item => {
    if (!item.parentId) {
      roots.push(item);
      return;
    }
    if (!childrenByParentId[item.parentId]) {
      childrenByParentId[item.parentId] = [];
    }
    childrenByParentId[item.parentId].push(item);
  });

  function buildNodes(nodes) {
    if (!nodes) {
      return null;
    }
    return nodes.map(node => ({
      ...nodes,
      children: buildNodes(childrenByParentId[node.id])
    }));
  }

  return buildNodes(roots);
}

const roots1 = [
  {
    id: 3,
    comment: "ghhghg",
    promotionId: 2,
    userId: 2
  },
  {
    userId: 1,
    promotionId: 2,
    comment: "okokok",
    parentId: 3,
    id: 4,
    children: [
      {
        userId: 1,
        promotionId: 2,
        comment: "kooo",
        parentId: 3,
        id: 5
      }
    ]
  }
];

const CommentsTree = ({ comments, sendComment }) => {
  //getTree(roots1);
  //console.log(getTree(comments));

  const tree = useMemo(() => getTree(comments), [comments]);
  console.log(tree);
  const [activeCommentBox, setActiveCommentBox] = useState(null);
  const [comment, setComment] = useState("");

  if (!comments) {
    return <div>Carregando...</div>;
  }

  function renderList(list) {
    return (
      <ul className="promotion-modal-comments-tree">
        {tree.map(item => renderItem(item))}
      </ul>
    );
  }

  function renderItem(item) {
    return (
      <li className="promotion-modal-comments-tree__item">
        <img
          className="promotion-modal-comments-tree__item__avatar"
          src={item.user.avatarUrl}
          alt={item.user.name}
        />
        <div className="promotion-modal-comments-tree__item__info">
          <span className="promotion-modal-comments-tree__item__name">
            {item.user.name}
          </span>
          <p className="">{item.comment} </p>
          <button
            onClick={() => {
              setComment("");
              setActiveCommentBox(
                activeCommentBox === item.id ? null : item.id
              );
            }}
            className="promotion-modal-comments-tree__answer-button"
          >
            Responder
          </button>

          {activeCommentBox === item.id && (
            <div className="promotion-modal-comments-tree__comment-box">
              <textarea
                value={comment}
                onChange={event => {
                  setComment(event.target.value);
                }}
              ></textarea>
              <button
                type="button"
                className="promotion-modal-comments-tree__send-button"
                onClick={() => {
                  sendComment(comment, item.id);
                  setComment("");
                  setActiveCommentBox(null);
                }}
              >
                Enviar
              </button>
            </div>
          )}
          {item.children && renderList(item.children)}
        </div>
      </li>
    );
  }

  return renderList(tree);
};

// CommentsTree.defaultProps = {
//   sendComment: () => {}
// };

export default CommentsTree;
