import React from "react";
import Navigation from "../header/navigation";
import Theme from "../header/theme";
import Link from "next/link";
import Members from "./members";
import User from "./user";
import HeaderMb from "./headerMb";

const Header = () => {
  return (
    <div className="header">
      <div className="header_content_xl">
        <Link href="/" className="logo">
          <img src="/logowhite.png" loading="lazy" alt={`banner`} />
        </Link>
        <div className="other">
          <Theme />
        </div>
        <Navigation />

        <Members />

        <User />
      </div>
      <HeaderMb />
    </div>
  );
};

export default Header;
