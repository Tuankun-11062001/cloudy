import Feeling from "@/components/box/home/feeling";
import { Suspense } from "react";

import CommunicationList from "@/components/box/home/list/communicationList";
import { AdsHorizal, ListVertical } from "@/components/ads/ads";
import { appSvg } from "@/data/svg";
import Link from "next/link";
import EventBanner, { EventBannerMB } from "@/components/box/event/event";
import Ui from "@/components/box/home/UI/ui";
import HomeLyrics from "@/components/box/home/lyrics/homeLyrics";
import MyProduct from "@/components/box/home/myProduct/myProduct";
import Follow from "@/components/box/home/follow/follow";

export const metadata = {
  title: "Bản Tin",
  description:
    "Chia sẻ những trải nghiệm hoặc cảm xúc cá nhân của bạn trong khoảnh khắc này. Hãy để cảm xúc của bạn được lắng nghe và kết nối với người khác qua câu chuyện của bạn.",
};

export default async function Home() {
  return (
    <div className="home">
      <EventBanner />
      <EventBannerMB />
      <div className="home_app">
        <Ui />
        <HomeLyrics />
        <MyProduct />
        <Follow />
      </div>
      {/* <div className="left">
        <div className="home_content">
          <Suspense
            fallback={<div className="icon_loading">{appSvg.loading}</div>}
          >
            <Feeling />
          </Suspense>
          <CommunicationList />
          <AdsHorizal />
        </div>
      </div>
      <div className="right">
        <ListVertical />
      </div> */}
    </div>
  );
}
