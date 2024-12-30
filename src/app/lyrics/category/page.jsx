import LyricsBack from "@/components/box/lyrics/button/lyricsBack";
import {
  LyricsCategoryCard,
  LyricsCategoryCountryCard,
} from "@/components/box/lyrics/card/lyricsCard";
import React, { Suspense } from "react";

export const metadata = {
  title: "Thể loại Lời bài hát",
  description:
    "Khám phá những bài hát và thể loại âm nhạc mới nhất trong bộ sưu tập ngày càng mở rộng của chúng tôi. Cập nhật những lời bài hát mới và khám phá các thể loại mới phục vụ sở thích âm nhạc đa dạng. Dù bạn yêu thích các bài hát hot đang thịnh hành hay những thể loại đặc biệt, bạn sẽ tìm thấy những bài hát mới nhất tại đây, được cập nhật thường xuyên để giúp bạn luôn bắt kịp xu hướng âm nhạc mới.",
};

const LyricsCategoryPage = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const lyricsCategories = await fetch(`${baseUrl}/category?q=lyrics`, {
    next: {
      revalidate: 10,
    },
  });
  const resCategory = await lyricsCategories.json();

  const lyricsContry = await fetch(`${baseUrl}/lyrics/country`, {
    next: {
      revalidate: 10,
    },
  });
  const resCountry = await lyricsContry.json();

  const bannerCategory = await fetch(`${baseUrl}/event`, {
    next: {
      revalidate: 10,
    },
  });
  const { data } = await bannerCategory.json();

  return (
    <div className="lyrics_category_page">
      <div className="head">
        <Suspense>
          <LyricsBack />
        </Suspense>
      </div>

      <div className="lyrics_category_page_banner">
        <img src={data[0].bannerCategoryLyrics} loading="lazy" alt={`banner`} />
      </div>

      <div className="country">
        <h2>Quốc gia</h2>
        <div className="country_list">
          {resCountry.data.map((country, index) => (
            <LyricsCategoryCountryCard
              data={country}
              index={country._id || index}
            />
          ))}
        </div>
      </div>

      <div className="type">
        <h2>Thể loại</h2>
        <div className="type_list">
          {resCategory.data.map((category, index) => (
            <LyricsCategoryCard data={category} index={category._id || index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LyricsCategoryPage;
