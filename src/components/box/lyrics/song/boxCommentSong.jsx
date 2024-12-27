import { lyricsApi } from "@/api/lyrics";
import { getLocalStorage } from "@/components/storage/local";

import { appSvg } from "@/data/svg";
import React, { useEffect, useState } from "react";

const BoxCommentSong = ({ data }) => {
  const [userId, setUserId] = useState();
  const [saveData, setSaveData] = useState(data?.comments || []);
  const [dataComment, setDataComment] = useState({
    id: data._id,
    userId: "",
    content: "",
  });

  const [newComment, setNewComment] = useState({
    userName: "",
    avatar: "",
    content: "",
  });

  useEffect(() => {
    const localId = getLocalStorage("_CM_id");
    const info = getLocalStorage("_CM_info");
    if (!localId || !info) {
      return;
    }

    setUserId(localId);
    setNewComment((prev) => {
      return {
        ...prev,
        userName: info.userName,
        avatar: info.avatar,
      };
    });

    setDataComment((prev) => {
      return {
        ...prev,
        userId: localId,
      };
    });
  }, []);

  const handleChange = (e) => {
    setDataComment((prev) => {
      return {
        ...prev,
        content: e.target.value,
      };
    });
  };

  const handleSubmit = async () => {
    const res = await lyricsApi.addComment(dataComment);
    if (res.status !== 201) {
      return;
    }
    setNewComment((prev) => {
      return {
        ...prev,
        content: dataComment.content,
      };
    });
  };

  const handleAskDelete = (e) => {
    const boxAsk = e.target.closest(".item").querySelector(".item_ask_delete");
    boxAsk.classList.toggle("active");
  };

  const handleYes = async (idComment) => {
    const payload = {
      idLyrics: data._id,
      idComment,
    };

    const res = await lyricsApi.deleteComment(payload);
    if (res.status !== 200) {
      return;
    }
    setSaveData(saveData.filter((item) => item._id !== idComment));
  };

  return (
    <div className="box_comment_song">
      <h4>Bình luận</h4>
      {userId ? (
        <div className="box_comment_song_reply">
          <input
            placeholder="Bạn có suy nghĩ gì về bài hát hay lời dịch..."
            onChange={handleChange}
            value={dataComment.content}
          />
          <p onClick={handleSubmit}>{appSvg.support}</p>
        </div>
      ) : (
        <p>Đăng nhập để bình luận</p>
      )}

      <div className="box_comment_song_list">
        {newComment.content ? (
          <div className="item">
            <img src={newComment?.avatar} loading="lazy" alt={`banner`} />
            <div className="info">
              <h5>{newComment?.userName}</h5>
              <p>{newComment?.content}</p>
            </div>
          </div>
        ) : (
          ""
        )}

        {saveData?.map((comment) => (
          <div className="item" key={comment._id}>
            <img src={comment.user.avatar} loading="lazy" alt={`banner`} />
            <div className="info">
              <h5>{comment?.user?.userName}</h5>
              <p>{comment?.content}</p>
            </div>
            {userId === comment?.user?._id && (
              <>
                <p className="trash" onClick={handleAskDelete}>
                  {appSvg.trash}
                </p>
                <div className="item_ask_delete">
                  <h3>Bạn chắc chắn xoá nó?</h3>
                  <div className="item_ask_delete_g">
                    <p onClick={() => handleYes(comment._id)}>Đúng!</p>
                    <p onClick={handleAskDelete}>Không!</p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoxCommentSong;
