import Script from "next/script";
import React from "react";

const Adsence = () => {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1126757639911388`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};

export default Adsence;
