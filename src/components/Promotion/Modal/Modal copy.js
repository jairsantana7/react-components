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

  const [msg, setMsg] = useState({});
  const [sendComment, sendCommentInfo] = useApi({
    url: "/comments",
    method: "POST",
    data: {
      userId: 1,
      promotionId: promotionId,
      comment: comment
    }

    // onCompleted: response => {
    //   setMsg(response.data);
    // }
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

  async function onSubmit(event) {
    event.preventDefault();
    try {
      // await sendComment({
      //   data: {
      //     userId: 1,
      //     promotionId: promotionId,
      //     comment: comment
      //   }
      // });

      await sendComment();
      setComment("");
      load();
    } catch (e) {}
  }

  useEffect(() => {
    //console.log(sendComment);
    //console.log(sendCommentInfo);
    //console.log(msg);
    load();
  }, []);

  async function sendAnswer(text, parentId) {
    await sendComment({
      data: {
        userId: 1,
        promotionId,
        comment: text,
        parentId
      }
    });
    load();
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
          {<CommentsTree comments={loadInfo.data} sendAnswer={sendAnswer} />}
        </UIModal>
      }
    </>
  );
};

export default PromotionModal;
