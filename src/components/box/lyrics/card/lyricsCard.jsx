import { appSvg } from "@/data/svg";

import Head from "next/head";
import Link from "next/link";
import React from "react";

export const LyricsCard = ({ data, index }) => {
  return (
    <div className="lyrics_card" key={index}>
      <Link
        href={{
          pathname: `/lyrics/${data?.title}`,
          query: { name: data?.title, id: data?._id },
        }}
      >
        <img
          src={data?.thumbnail}
          loading="lazy"
          alt={`thumbnail-${data.title}`}
        />

        <div className="lyrics_card_content">
          <h3>{data?.title}</h3>
          <p>Singer: {data?.singer?.singerName}</p>
          <p>Release: {data?.release}</p>
        </div>
      </Link>
    </div>
  );
};

export const LyricsSliderCard = ({ data, index }) => {
  return (
    <div className="lyrics_slider_card" key={index}>
      <img
        src={data.thumbnailBanner}
        loading="lazy"
        alt={`thumbnail-${data.title}`}
      />
      <div className="info">
        <div className="info_head">
          <span>{data.category.categoryName}</span>
          <span>Trending</span>
          <span>{data.release}</span>
        </div>
        <h2>{data.title}</h2>
        <p>{data.description}</p>
        <Link
          href={{
            pathname: `lyrics/${data.title}`,
            query: { name: data.title, id: data._id },
          }}
          className="check"
        >
          Check it now!
        </Link>
      </div>
    </div>
  );
};

export const LyricsSingerSliderCard = ({ data, index }) => {
  return (
    <div className="lyrics_singer_slider_card" key={index}>
      <Link
        href={{
          pathname: `/lyrics/${data.title}`,
          query: { name: data.title, id: data._id },
        }}
      >
        <img
          src={data?.thumbnailBanner}
          loading="lazy"
          alt={`banner-${data.title}`}
        />
      </Link>
    </div>
  );
};

export const SingerCard = ({ data, index }) => {
  return (
    <div className="singer_card" key={index}>
      <Link
        href={{
          pathname: `/lyrics/singer/${data.singerName}`,
          query: { name: data.singerName, id: data._id },
        }}
      >
        <img
          src={data?.singerImage}
          loading="lazy"
          alt={`thumbnail-${data.singerName}`}
        />
        <p>{data?.singerName}</p>
      </Link>
    </div>
  );
};

export const LyricsSingerCardHorizal = ({ data, index }) => {
  return (
    <div className="lyrics_singer_card_horizal" key={index}>
      <Link
        href={{
          pathname: `/lyrics/singer/${data.singerName}`,
          query: { name: data.singerName, id: data._id },
        }}
      >
        <img
          src={data.singerImage}
          alt={`thubmail-${data.singerName}`}
          loading="lazy"
        />
        <p>{data.singerName}</p>
      </Link>
    </div>
  );
};

export const LyricsCategoryCard = ({ data, index }) => {
  return (
    <div className="lyrics_category_card" key={index}>
      <Link
        href={{
          pathname: `/lyrics/category/${data.categoryName}`,
          query: { id: data._id, name: data.categoryName },
        }}
      >
        <img
          src={data.categoryImage}
          loading="lazy"
          alt={`thumbnail-${data.categoryName}`}
        />
        <p>{data.categoryName}</p>
      </Link>
    </div>
  );
};

export const LyricsCategoryCountryCard = ({ data, index }) => {
  return (
    <div className="lyrics_category_country_card" key={index}>
      <Link
        href={{
          pathname: `/lyrics/category/country/${data.countryName}`,
          query: { name: data.countryName, id: data._id },
        }}
      >
        <img
          src={data.countryImage}
          loading="lazy"
          alt={`thumbnail-${data.countryName}`}
        />
        <p>{data.countryName}</p>
      </Link>
    </div>
  );
};

export const LyricsDetailCategorySliderCard = ({ data, index }) => {
  return (
    <div className="lyrics_detail_category_slider_card" key={index}>
      <Link
        href={{
          pathname: `/lyrics/${data._id}`,
          query: { name: data.title, id: data._id },
        }}
      >
        <img
          src={data.thumbnailBanner}
          alt={`banner-${data.title}`}
          loading="lazy"
        />
      </Link>
    </div>
  );
};

export const LyricsDetailCategoryCountrySliderCard = ({ data, index }) => {
  return (
    <div className="lyrics_detail_category_country_slider_card" key={index}>
      <Link
        href={{
          pathname: `/lyrics/${data._id}`,
          query: { name: data.title, id: data._id },
        }}
      >
        <img src={data.thumbnailBanner} loading="lazy" alt={`banner`} />
      </Link>
    </div>
  );
};
