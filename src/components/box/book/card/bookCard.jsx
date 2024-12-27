import { appSvg } from "@/data/svg";
import React, { Suspense } from "react";
import { BookDetailCardButton } from "../button/bookButton";
import Link from "next/link";

export const BookSliderCard = ({ data, index }) => {
  return (
    <div className="book_slider_card" key={index}>
      <div className="info">
        <h2>{data.title}</h2>
        <h3>{data.author}</h3>
        <p className="des">{data.description}</p>
        <div className="other">
          <p>
            {appSvg.view} {data.view} Lượt xem
          </p>
          <p>
            {appSvg.cloud} {data.cloudy.length} Cloudy
          </p>
          <p>
            {appSvg.comment} {data.comments.length} Bình luận
          </p>
        </div>
        <div className="check">
          <Link
            href={{
              pathname: `/book/${data?.title}`,
              query: { id: data?._id },
            }}
          >
            <p>Khám phá ngay thôi!</p>
          </Link>
        </div>
      </div>
      <div className="image">
        <img src={data.thumbnailBanner} loading="lazy" alt={`banner`} />
      </div>
    </div>
  );
};

export const BookCategoryCard = ({ data, index }) => {
  return (
    <div className="book_category_card" key={index}>
      <Link
        href={{
          pathname: `/book/category/${data.categoryName}`,
          query: { name: data.categoryName, id: data._id },
        }}
      >
        <p>{data.categoryName}</p>
      </Link>
    </div>
  );
};

export const BookCard = async ({ data, index }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const demo = await fetch(
    `${baseUrl}/chapters/${data?.chapters[0]?.chapter}`,
    {
      next: {
        revalidate: 10,
      },
    }
  );
  const resDemo = await demo?.json();
  return (
    <div className="book_card" key={index}>
      <img
        className="book_card_image"
        src={data?.thumbnail}
        loading="lazy"
        alt={`banner`}
      />
      <div className="info">
        <Link
          href={{
            pathname: `/book/${data?.title}`,
            query: { id: data?._id },
          }}
        >
          <h2>{data?.title}</h2>
        </Link>
        <p>By {data?.author}</p>

        <p className="des">{data?.description}</p>
        <div className="other">
          <p>
            {appSvg.view} {data?.view}
          </p>
          <p>
            {appSvg.cloud} {data?.cloudy.length}
          </p>
        </div>
        <div className="bottom">
          <Link
            href={{
              pathname: `/book/${data?.title}`,
              query: { id: data?._id },
            }}
          >
            <p>Đọc luôn!</p>
          </Link>
          <Suspense fallback={<p>Loading...</p>}>
            <BookDetailCardButton />
          </Suspense>
        </div>
      </div>

      <div className="more_detail">
        <div className="more_detail_content">
          <div className="more_detail_content_left">
            <img src={data?.thumbnail} loading="lazy" alt={`banner`} />
            <Suspense>
              <BookDetailCardButton closeIcon={true} />
            </Suspense>
            <div className="more_detail_content_left_info">
              <h2>{data?.title}</h2>
              <p>By {data?.author}</p>
              <p className="des">{data?.description}</p>
              <div className="other">
                <p>
                  {appSvg.view} {data?.view}
                </p>
                <p>
                  {appSvg.cloud} {data?.cloudy.length}
                </p>
              </div>
              <Link
                href={{
                  pathname: `/book/${data?.title}`,
                  query: { id: data?._id },
                }}
              >
                <p className="check">Đọc luôn!</p>
              </Link>
            </div>
          </div>
          <div className="more_detail_content_right">
            <h3>Demo {data?.title}</h3>
            <div
              className="more_detail_content_right_demo tiptap"
              dangerouslySetInnerHTML={{
                __html: resDemo.data?.content || <p></p>,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BookCardHorizal = ({ data, index }) => {
  return (
    <div className="book_card_horizal" key={index}>
      <Link
        href={{
          pathname: `/book/${data?.title}`,
          query: { id: data?._id },
        }}
      >
        <img src={data.thumbnail} loading="lazy" alt={`banner`} />
        <div className="info">
          <h3>{data.title}</h3>
          <p>{data.author}</p>
          <p>{data.release}</p>
        </div>
      </Link>
    </div>
  );
};

export const BookCategorySliderCard = ({ data, index }) => {
  return (
    <div className="book_category_slider_card" key={index}>
      <div className="info">
        <h1>{data.title}</h1>
        <h3>{data.author}</h3>
        <p className="des">{data.description}</p>
        <div className="other">
          <p>
            {appSvg.view} {data.view} views
          </p>
          <p>
            {appSvg.cloud} {data.cloudy.length} Cloudy
          </p>
        </div>
        <div className="check">
          <Link
            href={{
              pathname: `/book/${data?.title}`,
              query: { id: data?._id },
            }}
          >
            <p>Let's Explore!</p>
          </Link>
        </div>
      </div>
      <div className="image">
        <img src={data.thumbnailBanner} loading="lazy" alt={`banner`} />
      </div>
    </div>
  );
};
