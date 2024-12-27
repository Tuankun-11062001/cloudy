"use client";
import Link from "next/link";
import React from "react";

const EnOldPage = () => {
  return (
    <div className="en_page">
      <h1>Hiện tại trang này chúng tôi không còn sử dụng!</h1>
      <p>
        Hãy bấm link dưới để về trang chủ hoặc bạn có thể bấm trang chủ phía
        dưới hoặc bên trái!
      </p>
      <div className="g">
        <Link href="/">Trở về trang Chủ</Link>
        <Link href="/lyrics">Tới trang Lyrics</Link>
      </div>
    </div>
  );
};

export default EnOldPage;
