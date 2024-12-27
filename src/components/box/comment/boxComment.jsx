"use client";
import React, { useEffect, useState } from "react";
import BoxFormComment from "./boxFormComment";
import BoxListComment from "./boxListComment";
import { getLocalStorage } from "@/components/storage/local";

const BoxComment = ({ data }) => {
  const [messagelogin, setMessageLogin] = useState(false);
  const [addComment, setAddComment] = useState(null);
  useEffect(() => {
    const localId = getLocalStorage("_CM_id");
    if (!localId) {
      return setMessageLogin(true);
    }
  }, []);

  return (
    <div className="box_comment">
      {messagelogin ? (
        <p className="box_comment_login">You must login to comment!</p>
      ) : (
        <BoxFormComment data={data} comment={setAddComment} />
      )}

      <BoxListComment
        comment={addComment}
        data={data}
        messageLogin={messagelogin}
      />
    </div>
  );
};

export default BoxComment;
