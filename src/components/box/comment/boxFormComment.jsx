import { communicationApi } from "@/api/communication";
import { getLocalStorage } from "@/components/storage/local";
import { appSvg } from "@/data/svg";
import React, { useEffect, useState } from "react";

const BoxFormComment = ({ data, comment }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [commentData, setCommentData] = useState({
    _id: data._id,
    userId: "",
    content: "",
  });

  useEffect(() => {
    const localInfo = getLocalStorage("_CM_info");
    const localId = getLocalStorage("_CM_id");

    if (!localInfo && !localId) {
      return;
    }
    setUserInfo(JSON.parse(localInfo));
    setCommentData((prev) => {
      return {
        ...prev,
        userId: localId,
      };
    });
  }, []);

  const handleChange = (e) => {
    setCommentData((prev) => {
      return {
        ...prev,
        content: e.target.value,
      };
    });
  };

  const handleSubmit = async () => {
    const res = await communicationApi.commentCommunication(commentData);
    if (res.data.status === 201) {
      comment({
        content: commentData.content,
        ...userInfo,
      });
    }
  };

  return (
    <div className="box_form_comment">
      <img src={userInfo?.avatar} loading="lazy" alt={`banner`} />
      <textarea
        placeholder="Your Comment...."
        onChange={handleChange}
        value={commentData.content}
      />
      <p onClick={handleSubmit}>{appSvg.support}</p>
    </div>
  );
};

export default BoxFormComment;
