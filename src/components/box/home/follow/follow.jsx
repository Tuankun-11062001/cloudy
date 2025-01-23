import { appSvg } from "@/data/svg";
import React from "react";

const Follow = () => {
  const social = [
    {
      icon: appSvg.youtube,
      linkSocial: "https://www.youtube.com/@cloudymelody1106",
      name: "Youtube",
    },
    {
      icon: appSvg.facebook,
      linkSocial: "https://www.facebook.com/profile.php?id=61565883526796",
      name: "Facebook",
    },
    {
      icon: appSvg.tiktok,
      linkSocial: "https://www.tiktok.com/@cloudy_melody1106",
      name: "Tiktok",
    },
    {
      icon: appSvg.threads,
      linkSocial: "https://www.threads.net/@junenguyen11",
      name: "Threads",
    },
    {
      icon: appSvg.instagram,
      linkSocial: "https://www.instagram.com/junenguyen11",
      name: "Instagram",
    },
  ];
  return (
    <div className="home_follow">
      <h2>Theo dõi Cloudy</h2>
      <div className="home_follow_list">
        {social.map((item, i) => (
          <FollowCard
            icon={item.icon}
            index={i}
            link={item.linkSocial}
            name={item.name}
          />
        ))}
      </div>
    </div>
  );
};

const FollowCard = ({ icon, index, link, name }) => {
  return (
    <a className="follow_card" href={link} target="_blank" key={index}>
      {icon}
      <span>{name}</span>
    </a>
  );
};

export default Follow;
