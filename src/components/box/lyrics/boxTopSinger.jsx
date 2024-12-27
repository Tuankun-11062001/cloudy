import Link from "next/link";
import React from "react";

const BoxTopSinger = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  let singers = await fetch(`${baseUrl}/lyrics/singerTop`, {
    next: { revalidate: 10 },
  });
  let res = await singers.json();
  return (
    <div className="box_top_singer">
      <div className="box_top_singer_head">
        <h2>Ca sĩ hot trong tuần</h2>
        <Link href="/lyrics/singer">Tất cả ca sĩ</Link>
      </div>
      <div className="box_top_singer_list">
        {res.data.map((singer, index) => (
          <div className="item" key={singer._id || index}>
            <Link
              href={{
                pathname: `/lyrics/singer/${singer.singerName}`,
                query: { name: singer.singerName, id: singer._id },
              }}
            >
              <img src={singer.singerImage} loading="lazy" alt={`banner`} />
              <h3>{singer.singerName}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoxTopSinger;
