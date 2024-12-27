"use client";
import { communicationApi } from "@/api/communication";
import BoxComment from "@/components/box/comment/boxComment";
import BoxShare from "@/components/box/home/boxShare";
import { getLocalStorage } from "@/components/storage/local";

import { appSvg } from "@/data/svg";
import React, { useEffect, useState } from "react";

const Feedback = ({ data }) => {
  const [boxShare, setBoxShare] = useState(false);
  const [boxComment, setBoxComment] = useState(false);
  const [like, setLike] = useState(false);
  useEffect(() => {
    const localId = getLocalStorage("_CM_id");
    if (!localId) {
      return;
    }
    const isLiked = data.cloudy.some((item) => item.user === localId);
    setLike(isLiked);
  }, [data]);

  const showBoxShare = () => {
    setBoxShare(!boxShare);
  };
  const showBoxComment = () => {
    setBoxComment(!boxComment);
  };

  const handleCloudyLike = async (e) => {
    const localId = getLocalStorage("_CM_id");
    if (!localId) {
      return console.log("you not login");
    }
    const payload = {
      _id: data._id,
      userId: localId,
    };

    const res = await communicationApi.cloudyCommunication(payload);

    if (res.status === 200) {
      setLike(!like);
    }
  };

  return (
    <div className="feedback">
      <div className="control">
        <p
          className={like ? "cloudy_like active" : "cloudy_like"}
          onClick={handleCloudyLike}
        >
          {appSvg.cloud} {data.cloudy.length} Cloudy
        </p>
        <p onClick={showBoxComment}>
          {appSvg.comment} {data.comments.length} Comments
        </p>
      </div>
      {boxComment && <BoxComment data={data} />}
    </div>
  );
};

export default Feedback;
