import React from "react";
import { LyricsCategoryCard } from "../card/lyricsCard";
import Link from "next/link";

const LyricsCategories = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  let categories = await fetch(`${baseUrl}/category?q=lyrics`, {
    next: { revalidate: 10 },
  });
  let res = await categories.json();
  return (
    <div className="lyrics_categories">
      <div className="lyrics_categories_head">
        <h2>Thể loại</h2>
        <Link href="/lyrics/category">Tất cả thể loại</Link>
      </div>
      <div className="lyrics_categories_list">
        {res.data.map((category, index) => (
          <LyricsCategoryCard data={category} index={category._id || index} />
        ))}
      </div>
    </div>
  );
};

export default LyricsCategories;
