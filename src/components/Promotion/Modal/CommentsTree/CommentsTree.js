import react from "react";
import "./CommentsTree.css";
import { useState, useMemo } from "react";

function getTree(list) {
  if (!list) {
    return [];
  }
  const roots = [];
  const childrenByParentId = {};

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
      ...node,
      children: buildNodes(childrenByParentId[node.id])
    }));
  }

  return buildNodes(roots);
}

const CommentsTree = ({ comments, sendComment }) => {
  //getTree(roots1);
  //console.log(getTree(comments));

  const tree = useMemo(() => getTree(comments), [comments]);
  const [activeCommentBox, setActiveCommentBox] = useState(null);
  const [comment, setComment] = useState("");

  if (!comments) {
    return <div>Carregando...</div>;
  }

  function renderItem(item, key) {
    return (
      <li key={key} className="promotion-modal-comments-tree__item">
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

  function renderList(list) {
    return (
      <ul className="promotion-modal-comments-tree">
        {list.map((item, key) => renderItem(item, key))}
      </ul>
    );
  }

  return renderList(tree);
};

// CommentsTree.defaultProps = {
//   sendComment: () => {}
// };

export default CommentsTree;
