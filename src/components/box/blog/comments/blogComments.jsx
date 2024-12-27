"use client";
import React, { useEffect, useState } from "react";
import { BlogCommentCard } from "../card/blogCard";
import { blogsApi } from "@/api/blogs";
import { getLocalStorage } from "@/components/storage/local";

const BlogComments = ({ data }) => {
  const [dataLocal, setDataLocal] = useState(data);
  const [idUser, setIdUser] = useState("");
  const [userinfo, setUserInfo] = useState();
  const [message, setMessage] = useState("");
  const [dataComment, setDataComment] = useState({
    content: "",
    userId: "",
    id: data._id,
  });

  useEffect(() => {
    const localId = getLocalStorage("_CM_id");
    const localInfo = getLocalStorage("_CM_info");

    if (!localId || !localInfo) {
      return;
    }

    setIdUser(localId);
    setUserInfo(localInfo);
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
    const res = await blogsApi.addComment(dataComment);
    if (res.status !== 201) {
      return;
    }

    const customComment = {
      user: {
        avatar: userinfo.avatar,
        userName: userinfo.userName,
      },
      content: dataComment.content,
    };

    setDataLocal((prev) => {
      return {
        ...prev,
        comments: [customComment, ...prev.comments],
      };
    });
  };

  return (
    <div className="blog_comments">
      {idUser ? (
        <div className="blog_comments_editor">
          <h4>Chia sẻ cảm nghĩ của bạn</h4>
          <textarea
            placeholder="Bạn nghĩ sao về bài viết đó!"
            onChange={handleChange}
            value={dataComment.content}
          />
          <p onClick={handleSubmit}>Gửi</p>
        </div>
      ) : (
        <p className="blog_comments_login">Hãy dăng nhập để chia sẻ ý kiến</p>
      )}

      <h3 className="blog_comments_title">Bình luận</h3>
      <div className="blog_comments_list">
        {dataLocal.comments.map((comment, indx) => (
          <BlogCommentCard
            data={comment}
            key={comment._id || indx}
            idUser={idUser}
            idBlog={data._id}
            setComments={setDataLocal}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogComments;
