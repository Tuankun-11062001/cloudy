"use client";
import { appSvg } from "@/data/svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navigation = () => {
  const path = usePathname();
  return (
    <div className="nav">
      <div className="nav_item">
        <Link href="/" className={path == "/" ? "active" : ""}>
          <div className="border_round_top"></div>
          <div className="border_round_bottom"></div>
          {appSvg.home}
          <p>Trang Chủ</p>
        </Link>
      </div>
      <div className="nav_item">
        <Link
          href="/lyrics"
          className={path.startsWith("/lyrics") ? "active" : ""}
        >
          <div className="border_round_top"></div>
          <div className="border_round_bottom"></div>
          {appSvg.lyrics}
          <p>Lời bài hát</p>
        </Link>
      </div>

      <div className="nav_item">
        <Link href="/blog" className={path.startsWith("/blog") ? "active" : ""}>
          <div className="border_round_top"></div>
          <div className="border_round_bottom"></div>
          {appSvg.blog}
          <p>blog</p>
        </Link>
      </div>

      {/* <div className="nav_item">
        <Link href="/book" className={path.startsWith("/book") ? "active" : ""}>
          <div className="border_round_top"></div>
          <div className="border_round_bottom"></div>
          {appSvg.book}
          <p>Sách</p>
        </Link>
      </div> */}
      <div className="nav_item">
        <Link href="/shop" className={path.startsWith("/shop") ? "active" : ""}>
          <div className="border_round_top"></div>
          <div className="border_round_bottom"></div>
          {appSvg.store}
          <p>Shop</p>
        </Link>
      </div>

      <div className="nav_item">
        <Link
          href="/profile"
          className={path.startsWith("/profile") ? "active" : ""}
        >
          <div className="border_round_top"></div>
          <div className="border_round_bottom"></div>
          {appSvg.profile}
          <p>Giới thiệu</p>
        </Link>
      </div>

      <div className="nav_item">
        <Link
          href="/support"
          className={path.startsWith("/support") ? "active" : ""}
        >
          <div className="border_round_top"></div>
          <div className="border_round_bottom"></div>
          {appSvg.support}
          <p>Hỗ trợ</p>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
