import { appSvg } from "@/data/svg";
import ButtonExtendBlogVertical from "@/components/box/blog/button/buttonExtendBlogVertical";
import React, { Suspense } from "react";

import { blogsApi } from "@/api/blogs";
import Link from "next/link";

export const BlogMostViewCard = ({ data }) => {
  return (
    <div className="blog_most_view_card">
      <h2>
        <Link
          href={{
            pathname: `/blog/${data._id}`,
            query: { name: data.title },
          }}
        >
          <abbr title={data.title}>{data.title}</abbr>
        </Link>
      </h2>
      <p>{data.description}</p>
      <div className="blog_most_view_card_view">
        <p>
          {appSvg.cloud} {data.cloudy.length} Cloudy
        </p>
        <p>
          {appSvg.view} {data.view} Views
        </p>
        <p>
          {appSvg.comment} {data.comments.length} comments
        </p>
      </div>
      <img src={data.thumbnail} loading="lazy" alt={`banner`} />
    </div>
  );
};

export const BlogCardHorizontal = ({ data, index }) => {
  return (
    <div className="blog_card_horizontal" key={index}>
      <img src={data.thumbnail} loading="lazy" alt={`banner`} />
      <div className="info">
        <h2>
          <Link
            href={{
              pathname: `/blog/${data._id}`,
              query: { name: data.title },
            }}
          >
            {data.title}
          </Link>
        </h2>
        <p>{data.description}</p>
        <div className="info_view">
          <p>
            {appSvg.cloud} {data.cloudy.length}{" "}
          </p>
          <p>
            {appSvg.view} {data.view}
          </p>
          <p>
            {appSvg.comment} {data.comments.length}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export const BlogCardVertical = ({ data, nameCategory, index }) => {
  return (
    <div className="blog_card_vertical" key={index}>
      <div className="blog_card_vertical_head">
        <div className="round_top"></div>
        <div className="round_bottom"></div>
        <img src={data.thumbnail} loading="lazy" alt={`banner`} />
        <div className="extend">
          <Suspense fallback={<p>Loading...</p>}>
            <ButtonExtendBlogVertical />
          </Suspense>
        </div>
      </div>

      <div className="blog_card_vertical_content">
        <h3>
          <Link
            href={{
              pathname: `/blog/${data._id}`,
              query: { name: data.title },
            }}
          >
            {data.title}
          </Link>
        </h3>
        <p>{data.description}</p>
        <div className="tag">
          <span>{nameCategory}</span>
        </div>
      </div>

      <div className="blog_card_vertical_detail">
        <div className="blog_card_vertical_detail_head">
          <h2>{data.title}</h2>
          <div className="other">
            <p></p>
            <div className="view">
              <p>
                {appSvg.cloud} {data.cloudy.length}
              </p>
              <p>
                {appSvg.view} {data.view}
              </p>
            </div>
          </div>
        </div>
        <div className="blog_card_vertical_detail_content">
          <p className="blog_card_vertical_detail_content_des">
            {data.description}
          </p>
          <div className="blog_card_vertical_detail_content_list_tag">
            <span>{nameCategory}</span>
          </div>
          <div className="blog_card_vertical_detail_content_bottom">
            <Link
              href={{
                pathname: `/blog/${data._id}`,
                query: { name: data.title },
              }}
            >
              <p className="blog_card_vertical_detail_content_bottom_check">
                Check it now!
              </p>
            </Link>

            <p className="blog_card_vertical_detail_content_bottom_time">
              {data.release}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BlogCommentCard = ({
  data,
  idUser,
  idBlog,
  setComments,
  index,
}) => {
  const handleAsk = (e) => {
    const boxAsk = e.target
      .closest(".blog_comment_card")
      .querySelector(".blog_comment_box_ask");
    boxAsk.classList.toggle("active");
  };

  const handleYes = async () => {
    const payload = {
      id: idBlog,
      idComment: data._id,
    };

    const res = await blogsApi.deleteComment(payload);
    if (res.status !== 200) {
      return;
    }

    setComments((prev) => {
      return {
        ...prev,
        comments: prev.comments.filter((item) => item._id !== data._id),
      };
    });
  };
  return (
    <div className="blog_comment_card" key={index}>
      <img src={data.user.avatar} loading="lazy" alt={`banner`} />
      <div className="info">
        <h4>{data.user.userName}</h4>
        <p>{data.content}</p>
      </div>
      {idUser === data?.user?._id && (
        <>
          <p className="blog_comment_card_trash" onClick={handleAsk}>
            {appSvg.trash}
          </p>
          <div className="blog_comment_box_ask">
            <h4>Are you sure?</h4>
            <div className="blog_comment_box_ask_g">
              <p onClick={handleYes}>Yes</p>
              <p onClick={handleAsk}>No</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const BoxSliderBlog = ({ data, index }) => {
  return (
    <div className="box_slider_blog" key={index}>
      <img src={data.thumbnail} loading="lazy" alt={`banner`} />
      <div className="info">
        <h2>
          <abbr title="title">{data.title}</abbr>
        </h2>
        <p className="info_des">{data.description}</p>
        <div className="info_bottom">
          <Link
            href={{
              pathname: `/blog/${data._id}`,
              query: { name: data.title },
            }}
          >
            <p className="check">Check it out {appSvg.arrowDown}</p>
          </Link>
          <div className="other">
            <p>
              {appSvg.cloud} {data.cloudy.length} Cloudy
            </p>
            <p>
              {appSvg.view} {data.view} Views
            </p>
            <p>
              {appSvg.share} {data.share} Share
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BoxBlogCategorySlider = ({ data, index }) => {
  return (
    <div className="box_blog_category_slider" key={index}>
      <img src={data.thumbnail} loading="lazy" alt={`banner`} />
      <div className="info">
        <span>{data.category.categoryName}</span>
        <h3>{data.title}</h3>
        <p className="des">{data.description}</p>
        <Link
          href={{
            pathname: `/blog/${data._id}`,
            query: { name: data.title },
          }}
        >
          <p className="check">Check it out!</p>
        </Link>
      </div>
    </div>
  );
};
