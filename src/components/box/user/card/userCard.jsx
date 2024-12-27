import { appSvg } from "@/data/svg";
import React from "react";

const UserCard = ({ data, key }) => {
  return (
    <div className="user_card" key={key}>
      <img src={data.avatar} loading="lazy" alt={`banner`} />
      <div className="info">
        <h3>{data.userName}</h3>
        <div className="info_social">
          {data.userSocial.map((item, index) => (
            <a
              key={index}
              href={item.linkSocial}
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
        <p>
          <abbr title={data.userDetail}>{data.userDetail}</abbr>
        </p>
      </div>
    </div>
  );
};

export default UserCard;
