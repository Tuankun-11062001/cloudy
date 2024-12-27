import {
  LyricsCard,
  LyricsSingerCardHorizal,
} from "@/components/box/lyrics/card/lyricsCard";
import React, { Suspense } from "react";
import { LyricsSingerSlider } from "@/components/box/lyrics/slider/lyricsSlider";
import LyricsBack from "@/components/box/lyrics/button/lyricsBack";

const DetailSinger = async ({ searchParams }) => {
  const { name, id } = await searchParams;
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const lyrics = await fetch(`${baseUrl}/lyrics?singer=${id}`, {
    next: {
      revalidate: 10,
    },
  });

  const singers = await fetch(`${baseUrl}/lyrics/singer`, {
    next: {
      revalidate: 10,
    },
  });

  const resLyrics = await lyrics.json();

  const { data } = await singers.json();

  const listSingers = data.slice(0, 9);

  return (
    <div className="lyrics_singer_detail">
      <div className="lyrics_singer_detail_head">
        <Suspense fallback={<p>Loadding...</p>}>
          <LyricsBack />
          <h1>Singer {name}</h1>
        </Suspense>
      </div>
      {resLyrics?.data?.length > 0 && (
        <LyricsSingerSlider data={resLyrics?.data} />
      )}

      <div className="lyrics_singer_detail_list">
        {resLyrics?.data?.map((lyric) => (
          <LyricsCard data={lyric} key={lyric._id} />
        ))}
      </div>

      <div className="lyrics_singer_detail_more">
        <h2>Top Hits Singer</h2>
        <div className="lyrics_singer_detail_more_list">
          {listSingers.map((singer) => (
            <LyricsSingerCardHorizal data={singer} key={singer._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailSinger;
