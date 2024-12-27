"use client";
import { bookApi } from "@/api/book";
import { getLocalStorage } from "@/components/storage/local";

import { appSvg } from "@/data/svg";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const BookDetailCardButton = ({ closeIcon }) => {
  const handleShowSmallDetail = (e) => {
    const parentCard = e.target.closest(".book_card");
    const boxDetail = parentCard.querySelector(".more_detail");
    boxDetail.classList.toggle("active");
  };
  return (
    <>
      {closeIcon ? (
        <p onClick={handleShowSmallDetail} className="close_detail">
          {appSvg.close}
        </p>
      ) : (
        <p onClick={handleShowSmallDetail}>Xem thêm!</p>
      )}
    </>
  );
};

export const BookButtonBack = () => {
  const router = useRouter();
  return (
    <p className="book_back" onClick={() => router.back()}>
      {appSvg.arrowDown}
    </p>
  );
};

export const BookDetailControl = ({ data, changeChapter, chapterState }) => {
  const [dataLocal, setDataLocal] = useState(data);
  const [userId, setUserId] = useState();
  const [like, setLike] = useState(false);
  const [userinfo, setUserInfo] = useState();

  const [dataComment, setDataComment] = useState({
    content: "",
    userId: "",
    id: data._id,
  });

  useEffect(() => {
    const increaseView = async () => {
      try {
        const res = await bookApi.updateView(data._id);
        console.log(res.data.message);
      } catch (error) {
        console.error("Error updating view:", error);
      }
    };
    increaseView();

    const localId = getLocalStorage("_CM_id");
    const info = getLocalStorage("_CM_info");
    if (!localId || !info) {
      return;
    }

    setUserId(localId);
    setDataComment((prev) => {
      return {
        ...prev,
        userId: localId,
      };
    });
    setUserInfo(info);
    const isLiked = data.cloudy.some((item) => item.user == localId);

    setLike(isLiked);
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
    const res = await bookApi.addComment(dataComment);
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

  const cloudy = async (e) => {
    if (!userId) {
      return;
    }

    const cloud = e.target.closest(".other").querySelector(".cloudy");
    cloud.classList.toggle("active");

    const payload = {
      id: data._id,
      userId,
    };

    const res = await bookApi.cloudyBook(payload);
    if (res.status === 200) {
      setLike(!like);
    }
  };

  const handleCommentTab = (e) => {
    const parentControl = e.target.closest(".book_detail_control");
    const boxComment = parentControl.querySelector(
      ".book_detail_control_comment"
    );
    boxComment.classList.toggle("active");
  };

  const handleAsk = (e) => {
    const boxAsk = e.target.closest(".item").querySelector(".item_box_ask");
    boxAsk.classList.toggle("active");
  };

  const handleYes = async (idComment) => {
    const payload = {
      id: data._id,
      idComment: idComment,
    };

    const res = await bookApi.deleteComment(payload);
    if (res.status !== 200) {
      return;
    }

    setDataLocal((prev) => {
      return {
        ...prev,
        comments: prev.comments.filter((item) => item._id !== idComment),
      };
    });
  };

  return (
    <div className="book_detail_control">
      <div className="book_detail_control_left">
        <BookButtonBack />

        <h1>{data.title}</h1>
      </div>
      <div className="book_detail_control_right">
        <div className="other">
          <p>
            {appSvg.view} {data.view}
          </p>
          <p className={like ? "cloudy active" : "cloudy"} onClick={cloudy}>
            {appSvg.cloud} {data.cloudy.length}
          </p>
          <p>
            {appSvg.share} {data.share.length}
          </p>
          <p onClick={handleCommentTab}>
            {appSvg.comment} {data.comments.length}
          </p>
        </div>
        <div className="book_detail_control_right_chapter">
          {/* <p>{appSvg.arrowDown}</p> */}
          <select value={chapterState} onChange={changeChapter}>
            {data.chapters.map((item, index) => (
              <option value={item.chapter._id} key={item.chapter._id || index}>
                {item.chapter.index} {item.chapter.title}
              </option>
            ))}
          </select>
          {/* <p>{appSvg.arrowDown}</p> */}
        </div>
      </div>

      <div className="book_detail_control_comment">
        <div className="book_detail_control_comment_head">
          <h3>Bình luận</h3>
          <p onClick={handleCommentTab}>{appSvg.close}</p>
        </div>
        {userId ? (
          <div className="book_detail_control_comment_edit">
            <textarea onChange={handleChange} value={dataComment.content} />
            <p onClick={handleSubmit}>{appSvg.support}</p>
          </div>
        ) : (
          <p>Hãy đăng nhập để bình luận</p>
        )}

        <h3>Những bình luận</h3>

        <div className="book_detail_control_comment_list">
          {dataLocal.comments.map((comment) => (
            <div className="item" key={comment._id}>
              <img src={comment.user.avatar} loading="lazy" alt={`banner`} />
              <div className="item_content">
                <h4>{comment.user.userName}</h4>
                <p>{comment.content}</p>
              </div>
              {userId === comment?.user?._id && (
                <>
                  <p className="item_trash" onClick={handleAsk}>
                    {appSvg.trash}
                  </p>
                  <div className="item_box_ask">
                    <h4>Bạn chắc chắn chứ?</h4>
                    <div className="item_box_ask_g">
                      <p onClick={() => handleYes(comment._id)}>Đúng!</p>
                      <p onClick={handleAsk}>Không!</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const BookDetailRead = () => {
  const handleRead = (e) => {
    const parentBookDetail = e.target.closest(".book_detail");
    const bookDetailHead = parentBookDetail.querySelector(".book_detail_head");
    const bookDetailContent = parentBookDetail.querySelector(
      ".book_detail_content"
    );

    const bookDetailHeadTitle = parentBookDetail.querySelector(
      ".book_detail_control_left h1"
    );

    bookDetailHead.classList.add("active");
    bookDetailContent.classList.add("active");
    bookDetailHeadTitle.classList.add("active");
    e.target.parentElement.classList.add("active");
  };
  return (
    <div className="book_detail_read" onClick={handleRead}>
      <p>{appSvg.arrowDown} Đọc thêm!</p>
    </div>
  );
};
