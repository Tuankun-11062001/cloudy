"use client";
import { communicationApi } from "@/api/communication";
import { userApi } from "@/api/user";
import CommunicationCard from "@/components/box/home/card/communicationCard";
import { getLocalStorage } from "@/components/storage/local";

import { appSvg } from "@/data/svg";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserDetail = ({ searchParams }) => {
  const [infoUser, setInfoUser] = useState();
  const router = useRouter();

  const [communications, setCommunications] = useState([]);
  const [event, setEvent] = useState([]);

  const { id } = searchParams;

  const [message, setMessage] = useState("");

  useEffect(() => {
    const localId = getLocalStorage("_CM_id");

    if (!localId) {
      router.push("/");
    }
    const user = async () => {
      const res = await userApi.findUser(id);
      const resCommunicaitons = await communicationApi.getCommunications(
        `?userId=${id}`
      );
      const event = await userApi.getEvent();
      setEvent(event.data.data[0]);
      setCommunications(resCommunicaitons.data.data);
      setInfoUser(res.data.data);
    };
    user();
  }, []);

  const [dataSocial, setDataSocial] = useState({
    social: "",
    linkSocial: "",
  });

  const [changePassword, setChangePassword] = useState({
    newPassword: "",
    reNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfoUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeAvatar = (data) => {
    setInfoUser((prev) => {
      return {
        ...prev,
        avatar: data,
      };
    });
  };

  const handleChangeBanner = (data) => {
    setInfoUser((prev) => {
      return {
        ...prev,
        banner: data,
      };
    });
  };

  const handleChangeSocial = (e) => {
    const { name, value } = e.target;
    setDataSocial((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddingSocial = () => {
    setInfoUser((prev) => {
      return {
        ...prev,
        userSocial: [...prev.userSocial, dataSocial],
      };
    });
  };

  const handleDeleteSocial = (index) => {
    const newSocial = infoUser.userSocial.filter((_, indx) => indx !== index);
    setInfoUser((prev) => {
      return {
        ...prev,
        userSocial: newSocial,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await userApi.editUser(infoUser);

      if (res.data.status !== 201) {
        setMessage("Error Save");
      }
      setMessage("Save Success");
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  // re password

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setMessage("");
    setChangePassword((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmitChangePasswrod = async () => {
    // check math pass
    if (changePassword.newPassword !== changePassword.reNewPassword) {
      return setMessage("Password Not Match");
    }

    const localId = getLocalStorage("_CM_id");

    const payload = {
      ...infoUser,
      newPassword: changePassword.newPassword,
      idChanger: localId,
    };

    const res = await userApi.changePassword(payload);
    if (res.status !== 200) {
      return;
    }
    setMessage(res.data.message);
  };

  // box create
  const openBoxCreate = (e) => {
    const boxCreate = e.target
      .closest(".detail_user")
      .querySelector(".detail_user_create");
    boxCreate.classList.toggle("active");
  };

  const openChangePassword = (e) => {
    const boxChange = e.target
      .closest(".detail_user")
      .querySelector(".detail_user_change_password");
    boxChange.classList.toggle("active");
  };

  return (
    <div className="detail_user">
      <div className="detail_user_head">
        <img
          src={infoUser?.banner}
          className="bg"
          loading="lazy"
          alt={`banner`}
        />
        <div className="avatar">
          <img src={infoUser?.avatar} loading="lazy" alt={`banner`} />
        </div>
        <span className="role">
          {infoUser?.admin ? "admin" : "Member"} Cloudy Melody
        </span>
        <div className="info">
          <div className="info_left">
            <h1>{infoUser?.userName}</h1>
            <p>{infoUser?.userDetail}</p>
            <div className="info_left_expand">
              <p onClick={openBoxCreate}>Chỉnh sửa thông tin</p>
              <p onClick={openChangePassword}>Thay đổi mật khẩu</p>
            </div>
          </div>
          <div className="info_right">
            {infoUser?.userSocial?.map((item, index) => (
              <a
                key={item._id || index}
                href={item.linkSocial}
                target="_blank"
                className={
                  item.social === "instagram" || item.social === "twitter"
                    ? "dark_white"
                    : ""
                }
              >
                {appSvg[item.social]}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="detail_user_create">
        <div className="detail_user_create_left">
          <p onClick={openBoxCreate} className="close">
            {appSvg.close}
          </p>
          {message && <span>{message}</span>}

          <div className="create_g">
            <span>Avatar</span>
            <div className="create_g_list">
              {event?.listAvatar?.map((item) => (
                <img
                  className={item.avatar === infoUser.avatar ? "active" : ""}
                  key={item._id}
                  onClick={() => handleChangeAvatar(item.avatar)}
                  src={item.avatar}
                  loading="lazy"
                  alt={`banner`}
                />
              ))}
            </div>
          </div>
          <div className="create_g">
            <span>Banner</span>
            <div className="create_g_list">
              {event?.listBannerProfile?.map((item) => (
                <img
                  className={item.banner === infoUser.banner ? "active" : ""}
                  key={item._id}
                  onClick={() => handleChangeBanner(item.banner)}
                  src={item.banner}
                  loading="lazy"
                  alt={`banner`}
                />
              ))}
            </div>
          </div>
          <div className="create_g">
            <span>UserName</span>
            <input
              placeholder="userName"
              name="userName"
              value={infoUser?.userName}
              onChange={handleChange}
            />
          </div>
          <div className="create_g">
            <span>UserEmail</span>
            <input
              placeholder="userEmail"
              name="userEmail"
              value={infoUser?.userEmail}
              onChange={handleChange}
            />
          </div>

          <div className="create_g">
            <span>User Detail</span>
            <input
              placeholder="userDetail"
              name="userDetail"
              value={infoUser?.userDetail}
              onChange={handleChange}
            />
          </div>
          <div className="create_g">
            <div className="create_g_head">
              <span>Social</span>
            </div>
            <div className="create_g_social">
              <div className="create_head">
                <select
                  name="social"
                  value={dataSocial.social}
                  onChange={handleChangeSocial}
                >
                  <option value="">Choose</option>
                  <option value="youtube">Youtube</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="tiktok">Tiktok</option>
                  <option value="twitter">Twitter</option>
                </select>
                <input
                  placeholder="link Social"
                  name="linkSocial"
                  value={dataSocial.linkSocial}
                  onChange={handleChangeSocial}
                />
              </div>
              <p onClick={handleAddingSocial}>Adding</p>
            </div>
            <div className="create_g_list">
              {infoUser?.userSocial.map((item, index) => (
                <p key={index} className="item">
                  <span onClick={() => handleDeleteSocial(index)}>
                    {appSvg.close}
                  </span>
                  {item.social}
                </p>
              ))}
            </div>
          </div>
          <p onClick={handleSubmit} className="create">
            Save
          </p>
        </div>
        <div className="detail_user_create_view">
          <img
            src={infoUser?.banner}
            className="banner"
            loading="lazy"
            alt={`banner`}
          />
          <div className="view_user">
            <div className="info">
              <img
                src={
                  infoUser?.avatar ||
                  "https://i.pinimg.com/564x/f6/3e/2f/f63e2fa676d8bd34ed21cc48f449dffd.jpg"
                }
                loading="lazy"
                alt={`banner`}
              />
              <h3>{infoUser?.userName}</h3>
              <p>{infoUser?.userEmail}</p>
            </div>
            <div className="social">
              {infoUser?.userSocial.map((item, index) => (
                <a
                  href={item.linkSocial}
                  key={item._id || index}
                  className={
                    item.social === "instagram" || item.social === "twitter"
                      ? "dark_white"
                      : ""
                  }
                >
                  {appSvg[item.social]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="detail_user_change_password">
        <div className="change_g">
          <span>New Password</span>
          <input
            placeholder="New Password"
            type="password"
            name="newPassword"
            value={changePassword.newPassword}
            onChange={handleChangePassword}
          />
        </div>
        <div className="change_g">
          <span>Re-New Password</span>
          <input
            placeholder="Re-New Password"
            type="password"
            name="reNewPassword"
            value={changePassword.reNewPassword}
            onChange={handleChangePassword}
          />
        </div>
        <span>{message}</span>
        <p onClick={handleSubmitChangePasswrod}>Change</p>
      </div>

      <div className="detail_user_content">
        <p>List Your Communications</p>
        <div className="list">
          {communications.map((communication) => (
            <CommunicationCard
              data={communication}
              key={communication._id}
              userId={id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
