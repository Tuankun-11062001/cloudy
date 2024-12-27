import Script from "next/script";
import React from "react";

const GoogleAnalytic = () => {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-ZBYVS3ZRM8"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', 'G-ZBYVS3ZRM8');
  `}
      </Script>
    </>
  );
};

export default GoogleAnalytic;
