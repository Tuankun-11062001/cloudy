import React from "react";
import { LyricsCard } from "../../lyrics/card/lyricsCard";

const HomeLyrics = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const res = await fetch(`${baseUrl}/lyrics/topSong`, {
    next: {
      revalidate: 10,
    },
  });

  const topSongs = await res.json();
  return (
    <div className="home_lyrics">
      <h2>Những bài hát Hot Mới nhất!</h2>
      <div className="home_lyrics_list">
        {topSongs?.data?.map((top, index) => (
          <LyricsCard data={top} index={top._id || index} />
        ))}
      </div>
    </div>
  );
};

export default HomeLyrics;
