"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    // Kiểm tra xem người dùng đã đồng ý hay từ chối cookies
    const cookiesConsent = getCookie("cookiesConsent");

    // Nếu chưa có sự đồng ý, hiển thị banner
    if (!cookiesConsent) {
      setIsBannerVisible(true);
    }
  }, []);

  const handleAllowCookies = () => {
    // Lưu trạng thái "Allow" vào cookie và ẩn banner
    setCookie("cookiesConsent", "allowed", 365);
    setIsBannerVisible(false);
  };

  const handleDeclineCookies = () => {
    // Lưu trạng thái "Decline" vào cookie và ẩn banner
    setCookie("cookiesConsent", "declined", 365);
    setIsBannerVisible(false);
  };

  // Nếu banner không cần hiển thị, trả về null
  if (!isBannerVisible) return null;

  return (
    <>
      <div className="cookieBanner">
        <div>
          <Link href="/policy">
            <p>
              We use <span className="font-bold text-sky-400">cookies</span> to
              improve your experience. Learn more in our{" "}
              <strong>cookie policy</strong>.
            </p>
          </Link>
        </div>

        <div className="buttonGroup">
          <button onClick={handleDeclineCookies} className="declineButton">
            Decline
          </button>
          <button onClick={handleAllowCookies} className="allowButton">
            Allow Cookies
          </button>
        </div>
      </div>
    </>
  );
}

// Hàm để cài đặt cookie
export const setCookie = (name, value, days) => {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
};

// Hàm để lấy giá trị của một cookie
export const getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

// Hàm để xóa cookie
export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};
