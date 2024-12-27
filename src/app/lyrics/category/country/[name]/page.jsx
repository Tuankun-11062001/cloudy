import LyricsBack from "@/components/box/lyrics/button/lyricsBack";
import { LyricsCard } from "@/components/box/lyrics/card/lyricsCard";
import { LyricsDetailCategoryCountrySlider } from "@/components/box/lyrics/slider/lyricsSlider";
import React, { Suspense } from "react";

const LyricsDetailCategoryCountry = async ({ searchParams }) => {
  const { name, id } = await searchParams;
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const lyricsCountry = await fetch(`${baseUrl}/lyrics/country/${id}`, {
    next: {
      revalidate: 10,
    },
  });
  const resLyricsCountry = await lyricsCountry.json();

  return (
    <div className="lyrics_detail_category_country">
      <div className="head">
        <div className="top">
          <LyricsBack />
          <h1>Top bài hát của {name}</h1>
        </div>
        {resLyricsCountry?.slideSongs?.length >= 1 && (
          <LyricsDetailCategoryCountrySlider
            data={resLyricsCountry.slideSongs}
          />
        )}
      </div>

      {Object?.entries(resLyricsCountry?.data).map(([category, lyrics]) => (
        <div className="top_hits" key={category}>
          <h2>Top Hits {category.toUpperCase()}</h2>
          <div className="top_hits_list">
            {lyrics.map((lyric, index) => (
              <LyricsCard data={lyric} index={lyric._id || index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LyricsDetailCategoryCountry;
