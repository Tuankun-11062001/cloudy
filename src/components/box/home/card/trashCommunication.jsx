"use client";
import { communicationApi } from "@/api/communication";
import { appSvg } from "@/data/svg";
import React from "react";

const TrashCommunication = ({ userId, data }) => {
  const boxAsk = (e) => {
    const box = e.target.closest(".motify").querySelector(".box_ask");
    box.classList.toggle("active");
  };

  const handleYes = async () => {
    const res = await communicationApi.deleteCommunication(data._id);
    if (res.status !== 200) {
      return;
    }
    window.location.reload();
  };

  return (
    <>
      {userId === data.user._id && <p onClick={boxAsk}>{appSvg.trash}</p>}
      <div className="box_ask">
        <h3>Are you sure to delete?</h3>
        <div className="box_ask_g">
          <p onClick={handleYes}>Yes</p>
          <p onClick={boxAsk}>No</p>
        </div>
      </div>
    </>
  );
};

export default TrashCommunication;
