"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not_found">
      <h1>Tớ nghĩ bạn đi sai đường mất rồi! Về cùng tớ nhé!</h1>
      <div className="g">
        <Link href="/">Về trang chủ</Link>
        <Link href="/lyrics">Nghe nhạc qua đây nè!</Link>
      </div>
    </div>
  );
}
