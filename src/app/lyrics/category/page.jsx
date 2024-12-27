import LyricsBack from "@/components/box/lyrics/button/lyricsBack";
import {
  LyricsCategoryCard,
  LyricsCategoryCountryCard,
} from "@/components/box/lyrics/card/lyricsCard";
import React, { Suspense } from "react";

export const metadata = {
  title: "Category lyrics",
  description:
    "Discover the latest songs and music genres in our ever-expanding collection. Stay updated with fresh lyrics and explore new categories that cater to diverse musical tastes. Whether you're into trending hits or niche genres, you'll find the newest tracks here, regularly updated to keep you in tune with the latest musical trends.",
};

const LyricsCategoryPage = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const lyricsCategories = await fetch(`${baseUrl}/category?q=lyrics`, {
    next: {
      revalidate: 10,
    },
  });
  const resCategory = await lyricsCategories.json();

  const lyricsContry = await fetch(`${baseUrl}/lyrics/country`, {
    next: {
      revalidate: 10,
    },
  });
  const resCountry = await lyricsContry.json();

  const bannerCategory = await fetch(`${baseUrl}/event`, {
    next: {
      revalidate: 10,
    },
  });
  const { data } = await bannerCategory.json();

  return (
    <div className="lyrics_category_page">
      <div className="head">
        <Suspense>
          <LyricsBack />
        </Suspense>
      </div>

      <div className="lyrics_category_page_banner">
        <img src={data[0].bannerCategoryLyrics} loading="lazy" alt={`banner`} />
      </div>

      <div className="country">
        <h2>Quốc gia</h2>
        <div className="country_list">
          {resCountry.data.map((country, index) => (
            <LyricsCategoryCountryCard
              data={country}
              index={country._id || index}
            />
          ))}
        </div>
      </div>

      <div className="type">
        <h2>Thể loại</h2>
        <div className="type_list">
          {resCategory.data.map((category, index) => (
            <LyricsCategoryCard data={category} index={category._id || index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LyricsCategoryPage;
