"use client";
import { lyricsApi } from "@/api/lyrics";
import { LyricsCard } from "@/components/box/lyrics/card/lyricsCard";
import Link from "next/link";
import { use, useEffect, useState } from "react";

const SearchLyrics = ({ searchParams }) => {
  const { title } = use(searchParams);
  const [dataSearch, setDataSearch] = useState("");
  const [lyrics, setLyrics] = useState([]);
  const [lyricsLatest, setlyricsLatest] = useState([]);

  useEffect(() => {
    const handleSearch = async (e) => {
      const res = await lyricsApi.searchLyrics(title);
      if (res.status === 200) {
        setLyrics(res.data.data);
      } else {
        setLyrics([]);
      }
    };

    const handleLyricsLatest = async (e) => {
      const res = await lyricsApi.getFillterLyrics(`?page=1`);
      if (res.status === 200) {
        setlyricsLatest(res.data.data);
      } else {
        setlyricsLatest([]);
      }
    };
    handleSearch();
    handleLyricsLatest();
  }, [title]);

  const handleSearch = (e) => {
    setDataSearch(e.target.value);
  };

  return (
    <div className="lyrics_search">
      <div className="lyrics_search_input">
        <input
          placeholder="Tìm kiếm bài hát..."
          onChange={handleSearch}
          value={dataSearch}
        />
        <Link
          className="lyrics_search_input_btn"
          href={{
            pathname: `/lyrics/search`,
            query: { title: dataSearch },
          }}
        >
          Tìm kiếm
        </Link>
      </div>
      <div className="lyrics_search_result">
        {lyrics?.map((item, index) => (
          <LyricsCard data={item} index={index} key={item._id || index} />
        ))}
      </div>

      <h3>Những bài hát mới nhất</h3>
      <div className="lyrics_search_latest">
        {lyricsLatest?.map((item, index) => (
          <LyricsCard data={item} index={index} key={item._id || index} />
        ))}
      </div>
    </div>
  );
};

export default SearchLyrics;
