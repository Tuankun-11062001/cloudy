"use client";
import { communicationApi } from "@/api/communication";
import { getLocalStorage } from "@/components/storage/local";

import { appSvg } from "@/data/svg";
import React, { useEffect, useState } from "react";

const BoxListComment = ({ data, comment, messageLogin }) => {
  const [newData, setNewData] = useState(data);
  const [replyData, setReplyData] = useState({
    _id: data._id,
    commentId: "",
    userId: "",
    content: "",
  });

  const handleChange = (e) => {
    setReplyData((prev) => {
      return {
        ...prev,
        content: e.target.value,
      };
    });
  };

  const handleSubmitReply = async (commentId) => {
    const localId = getLocalStorage("_CM_id");
    const info = getLocalStorage("_CM_info");

    const payload = {
      ...replyData,
      userId: localId,
      commentId,
    };

    const newReplyComment = {
      ...info,
      content: replyData.content,
    };

    const res = await communicationApi.commentReplyCommunication(payload);
    if (res.status === 201) {
      setNewData((prev) => {
        // Tìm comment cần cập nhật
        const updatedComments = prev.comments.map((comment) => {
          if (comment._id === commentId) {
            // Thêm reply mới vào danh sách replies
            return {
              ...comment,
              reply: [newReplyComment, ...comment.reply], // Giả sử `res.data` chứa thông tin reply mới
            };
          }
          return comment;
        });
        return {
          ...prev,
          comments: updatedComments,
        };
      });
    }
  };

  const handleShowReply = (e) => {
    const boxReply = e.target.parentElement.querySelector(".box_reply");
    boxReply.classList.toggle("active");
  };

  useEffect(() => {
    if (!comment) {
      return;
    }
    setNewData((prev) => {
      return {
        ...prev,
        comments: [comment, ...prev.comments],
      };
    });
  }, [comment]);

  return (
    <>
      {newData.comments.map((item) => (
        <div className="comment" key={item._id}>
          <img
            src={item?.user?.avatar || item?.avatar}
            loading="lazy"
            alt={`banner`}
          />
          <div className="comment_content">
            <h5>{item?.user?.userName || item?.userName}</h5>
            <p>{item?.content}</p>
            <div className="comment_content_control">
              <p> {appSvg.cloud} 0 Cloudy</p>
              {messageLogin ? (
                <></>
              ) : (
                <>
                  <p onClick={handleShowReply}>{appSvg.reply} reply</p>

                  <div className="box_reply">
                    <textarea
                      placeholder="Your Reply..."
                      onChange={handleChange}
                      value={replyData.content}
                    />
                    <p onClick={() => handleSubmitReply(item._id)}>
                      {appSvg.support}
                    </p>
                  </div>
                </>
              )}
            </div>
            {item?.reply?.map((itemReply) => (
              <div className="comment_content_reply" key={itemReply._id}>
                <img
                  src={itemReply?.user?.avatar || itemReply?.avatar}
                  loading="lazy"
                  alt={`banner`}
                />
                <div className="content_reply">
                  <h5>{itemReply?.user?.userName || itemReply?.userName}</h5>
                  <p>{itemReply?.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default BoxListComment;
