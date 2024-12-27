import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/sass/global.scss";
import Header from "@/components/header/header";
import { Suspense } from "react";
import { AdsBottom, AdsPopup } from "@/components/ads/ads";
import Adsence from "../../components/adsence";
import GoogleAnalytic from "../../components/googleAnalytic";
import GoogleConsole from "../../components/googleConsole";
import { GoogleTag, GoogleTagBody } from "../../components/googleTag";
import CookieBanner from "../../components/cookieBanner";
import ConsentMode from "../../components/consentMode";

export const metadata = {
  title: {
    default: "Cloudy Melody", // Tiêu đề mặc định
    template: "%s | Cloudy Melody", // Sử dụng %s để thêm tiêu đề trang cụ thể
  },
  description:
    "Cloudy Melody - A blog sharing song lyrics, lyric books, and a music store. Explore translations of songs about life and connect with a community of music lovers.",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <ConsentMode />
        <GoogleAnalytic />
        <GoogleConsole />
        <GoogleTag />
        <Adsence />
      </head>
      <body>
        <Header />
        <div className="app_content">{children}</div>

        <Suspense>
          <AdsBottom />
          <AdsPopup />
          <CookieBanner />
        </Suspense>

        <Analytics />
        <GoogleTagBody />

        <SpeedInsights />
      </body>
    </html>
  );
}
