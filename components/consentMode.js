"use client";
import Script from "next/script";
import React, { useEffect } from "react";

// Hàm lấy giá trị cookie
const getCookie = (name) => {
  let cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    let cookie = cookieArr[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null; // Không tìm thấy cookie
};

const ConsentMode = () => {
  useEffect(() => {
    // Cài đặt consent mode mặc định khi tải trang
    gtag("consent", "default", {
      ad_storage: "denied",
      analytics_storage: "denied",
    });

    // Lấy giá trị cookie consent
    const cookiesConsent = getCookie("cookiesConsent"); // Kiểm tra cookie đã được thiết lập

    // Cập nhật consent mode sau khi tải xong trang và có trạng thái consent
    if (cookiesConsent === "allowed") {
      gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
      });
    } else {
      gtag("consent", "update", {
        ad_storage: "denied",
        analytics_storage: "denied",
      });
    }
  }, []);

  return (
    <>
      {/* Tải gtag.js từ Google Tag Manager */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-ZBYVS3ZRM8"
        strategy="afterInteractive"
      />

      {/* Đảm bảo gtag được khởi tạo sau khi script được tải */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZBYVS3ZRM8');
        `}
      </Script>
    </>
  );
};

export default ConsentMode;
