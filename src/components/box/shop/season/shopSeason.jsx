import React from "react";
import { ShopProductCard } from "../card/shopCard";

export const ShopSeason = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const resTrending = await fetch(`${baseUrl}/shop?trending=true`, {
    next: {
      revalidate: 10,
    },
  });

  const trending = await resTrending.json();

  return (
    <div className="shop_season">
      <h2>Top Cho mùa</h2>
      <div className="shop_season_list">
        {trending.data.map((product, index) => (
          <ShopProductCard data={product} index={product._id || index} />
        ))}
      </div>
    </div>
  );
};
