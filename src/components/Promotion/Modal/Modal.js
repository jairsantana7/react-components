import UIModal from "components/UI/Modal/Modal";
import React, { useEffect, useState } from "react";
import useApi from "../utils/useApi";
import CommentsTree from "./CommentsTree/CommentsTree";
import "./Modal.css";

const PromotionModal = ({ promotionId, onClickClose }) => {
  const [comment, setComment] = useState("");
  const [load, loadInfo] = useApi({
    url: "/comments",
    params: {
      promotionId,
      _expand: "user"
      //_expand: "user"
    }
  });

  const [sendComment, sendCommentInfo] = useApi({
    url: "/comments",
    method: "POST",
    data: {
      userId: 1,
      promotionId: promotionId,
      comment: comment
    }
  });

  // async function onSubmit(event) {
  //   event.preventDefault();

  //   try {
  //     load();
  //     await sendComment({
  //       data: {
  //         userId: 1,
  //         promotionId: promotionId,
  //         comment: comment
  //       }
  //     });
  //   } catch (error) {}
  // }

  useEffect(() => {
    load();
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      await sendComment();
      setComment("");
      load({ quietly: true });
    } catch (e) {}
  }

  //console.log(loadInfo);

  return (
    <>
      {
        <UIModal
          isOpen
          onClickClose={() => {
            onClickClose(null);
          }}
        >
          <form className="promotion-modal__comment-form" onSubmit={onSubmit}>
            <label htmlFor="comment">Comentário</label>
            <textarea
              name="comment"
              placeholder="Comentar..."
              onChange={event => setComment(event.target.value)}
              value={comment}
            />
            <button type="submit" disabled={sendCommentInfo.loading}>
              {sendCommentInfo.loading ? "Enviando" : "Enviar"}
            </button>
          </form>

          <h1>Comentários</h1>
          {<CommentsTree comments={loadInfo.data} />}
        </UIModal>
      }
    </>
  );
};

export default PromotionModal;
