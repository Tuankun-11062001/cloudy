import { LyricsCard } from "@/components/box/lyrics/card/lyricsCard";
import React from "react";

const BoxTopSong = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const res = await fetch(`${baseUrl}/lyrics/topSong`, {
    next: {
      revalidate: 10,
    },
  });

  const topSongs = await res.json();
  return (
    <div className="box_top_song">
      <div className="box_top_song_head">
        <h3>Top các bài hát trong tuần</h3>
      </div>
      <div className="box_top_song_list">
        {topSongs?.data?.map((top, index) => (
          <LyricsCard data={top} index={top._id || index} />
        ))}
      </div>
    </div>
  );
};

export default BoxTopSong;
