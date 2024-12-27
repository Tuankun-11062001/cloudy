import LyricsBack from "@/components/box/lyrics/button/lyricsBack";
import { LyricsCard } from "@/components/box/lyrics/card/lyricsCard";
import { LyricsDetailCategorySlider } from "@/components/box/lyrics/slider/lyricsSlider";
import React from "react";

const LyricsDetailCategory = async ({ searchParams }) => {
  const { name, id } = searchParams;
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const lyricsCategory = await fetch(`${baseUrl}/lyrics/category/${id}`, {
    next: {
      revalidate: 10,
    },
  });
  const resLyrics = await lyricsCategory.json();

  return (
    <div className="lyrics_detail_category">
      <div className="head">
        <div className="top">
          <LyricsBack />
          <h1>Top Music {name} </h1>
        </div>
        {resLyrics.slideSongs && (
          <LyricsDetailCategorySlider data={resLyrics.slideSongs} />
        )}
      </div>
      <div className="content">
        {Object?.entries(resLyrics?.data).map(([country, lyrics]) => (
          <div key={country} className="top_hits">
            <h2>Top Hit {country.toUpperCase()}</h2>
            {/* Hiển thị tên quốc gia */}
            <div className="top_hits_list">
              {lyrics.map((lyric, index) => (
                <LyricsCard index={lyric._id || index} data={lyric} /> // Giả sử LyricsCard nhận lyric làm prop
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LyricsDetailCategory;
