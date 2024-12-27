import BoxLyricsTrending from "@/components/box/lyrics/boxLyricsTrending";
import BoxTopSinger from "@/components/box/lyrics/boxTopSinger";
import BoxTopSong from "@/components/box/lyrics/boxTopSong";

import Search from "@/components/box/lyrics/search/search";
import React, { Suspense } from "react";
import LyricsCategories from "@/components/box/lyrics/category/lyricsCategories";
import { LyricsSlider } from "@/components/box/lyrics/slider/lyricsSlider";
import AllLyrics from "@/components/box/lyrics/allLyrics/allLyrics";

export const metadata = {
  title: "Lyrics",
  description:
    "Hot Lyrics - New Song Lyrics - Multi-language Sub 🎶 Lời bài hát: Đây là nơi bạn có thể tìm thấy lời của những bài hát yêu thích. Tôi khuyến khích mọi người không chỉ đọc lời bài hát mà còn chia sẻ bản dịch và sự giải thích của riêng mình. Âm nhạc là một ngôn ngữ toàn cầu, và tôi tin rằng việc khám phá ý nghĩa của từng bài hát sẽ khiến trải nghiệm âm nhạc trở nên ý nghĩa hơn.",
};

const LyricsPage = () => {
  return (
    <div className="lyrics_page">
      <div className="left">
        <h1>Lời bài hát</h1>
        <Suspense fallback={<p>Loading search...</p>}>
          <Search />
        </Suspense>
        <BoxLyricsTrending />
        <LyricsCategories />

        <BoxTopSinger />

        <BoxTopSong />
        <AllLyrics />
      </div>
      <div className="right_slider">
        <div className="right_slider_black_art"></div>
        <LyricsSlider />
      </div>
    </div>
  );
};

export default LyricsPage;
