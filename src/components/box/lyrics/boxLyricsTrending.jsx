import { appSvg } from "@/data/svg";
import Link from "next/link";

import React from "react";

const BoxLyricsTrending = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const trendings = await fetch(`${baseUrl}/lyrics?trending=true`, {
    next: {
      revalidate: 10,
    },
  });
  const res = await trendings.json();
  return (
    <div className="box_lyrics_trending">
      <div className="box_lyrics_trending_head">
        {appSvg.fire} Những bài hát xu hướng
      </div>
      <div className="box_lyrics_trending_list">
        {res.data.map((trending, indx) => (
          <Link
            href={{
              pathname: `/lyrics/${trending?._id}`,
              query: { name: trending?.title },
            }}
            key={trending._id || indx}
          >
            <div className="item">
              <p className="item_no">{indx + 1}</p>
              <h4>{trending.title}</h4>
              <p className="item_singer">{trending.singer.singerName}</p>
              <span className="item_chart">
                {appSvg.chardView} {trending.view}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BoxLyricsTrending;
