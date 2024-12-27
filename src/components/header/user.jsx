"use client";
import { appSvg } from "@/data/svg";
import React, { useEffect, useState } from "react";
import Auth from "../auth/auth";
import { getUserId } from "@/api/auth";
import { clearStorage, getLocalStorage } from "../storage/local";
import Link from "next/link";

const User = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(false);
  const [infoUser, setInfoUser] = useState(null);

  useEffect(() => {
    const idLocal = getLocalStorage("_CM_id");

    if (!idLocal) {
      setUser(false);
      return;
    }
    if (idLocal) {
      (async () => {
        try {
          const res = await getUserId(idLocal);
          if (res.status !== 200) {
            clearStorage("_CM_id");
          }
          setInfoUser(res.data.data);
        } catch (error) {
          console.log(error);
        }
      })();
      setUser(true);
    }
  }, [user]);

  const toggleSubMenu = (e) => {
    const sub = e.target.parentElement.querySelector(".sub_menu");
    sub.classList.toggle("active");
  };

  const openAuth = () => {
    setShowAuth(!showAuth);
  };

  const handleExit = () => {
    clearStorage();
    setUser(false);
    // Tải lại trang hiện tại
    window.location.reload();
  };

  return (
    <div className="header_user">
      <div className="content_mb">
        {user ? (
          <div className="user">
            <div className="left">
              <Link
                href={{
                  pathname: `/user/${infoUser?.userName}`,
                  query: { id: infoUser?._id },
                }}
              >
                <img src={infoUser?.avatar} loading="lazy" alt={`banner`} />
              </Link>
              <p className="exit" onClick={handleExit}>
                {appSvg.exit}
              </p>
            </div>
          </div>
        ) : (
          <p className="header_login" onClick={openAuth}>
            {appSvg.user}
          </p>
        )}

        {showAuth && (
          <Auth stateLogin={showAuth} funcUser={setUser} closeFunc={openAuth} />
        )}
      </div>
      <div className="content_xl">
        {user ? (
          <div className="user">
            <div className="left">
              <img src={infoUser?.avatar} loading="lazy" alt={`banner`} />
              <div className="info">
                <h3>{infoUser?.userName}</h3>
                <p>{infoUser?.admin ? "Admin" : "Member"}</p>
              </div>
            </div>
            <p className="motify" onClick={toggleSubMenu}>
              {appSvg.elips}
            </p>
            <div className="sub_menu">
              <Link
                href={{
                  pathname: `/user/${infoUser?.userName}`,
                  query: { id: infoUser?._id },
                }}
              >
                {appSvg.user}
                <p>Thông tin cá nhân</p>
              </Link>
              <p className="exit" onClick={handleExit}>
                {appSvg.exit} Thoát
              </p>
            </div>
          </div>
        ) : (
          <p className="header_login" onClick={openAuth}>
            Đăng nhập
          </p>
        )}

        {showAuth && (
          <Auth stateLogin={showAuth} funcUser={setUser} closeFunc={openAuth} />
        )}
      </div>
    </div>
  );
};

export default User;
