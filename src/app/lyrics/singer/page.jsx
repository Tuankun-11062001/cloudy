import LyricsBack from "@/components/box/lyrics/button/lyricsBack";
import { SingerCard } from "@/components/box/lyrics/card/lyricsCard";

import React, { Suspense } from "react";

export const metadata = {
  title: "Singer",
  description:
    "Explore the best songs from the world’s top artists. Stay updated with the latest chart-topping hits and timeless classics from your favorite singers. Whether you're into pop, rock, hip-hop, or any other genre, you'll find the most popular tracks and iconic performances right here, constantly updated with new releases.",
};

const Singer = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const singers = await fetch(`${baseUrl}/lyrics/singerByCountry`, {
    next: {
      revalidate: 10,
    },
  });

  const bannerSinger = await fetch(`${baseUrl}/event`, {
    next: {
      revalidate: 10,
    },
  });

  const resSingers = await singers.json();

  const { data } = await bannerSinger.json();

  return (
    <div className="lyrics_singer">
      <LyricsBack />
      <div className="lyrics_singer_banner">
        <img
          src={data[0]?.bannerCategorySinger}
          loading="lazy"
          alt={`banner`}
        />
      </div>

      {Object?.entries(resSingers?.data).map(([country, singers]) => (
        <div className="lyrics_singer_g" key={country}>
          <h2>Top Hits {country.toUpperCase()}</h2>
          <div className="lyrics_singer_g_list">
            {singers.map((singer) => (
              <SingerCard data={singer} key={singer._id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Singer;
