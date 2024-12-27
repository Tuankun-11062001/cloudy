import React from "react";
import { ShopProductCard } from "../card/shopCard";

export const ShopMyDesign = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const resMyProduct = await fetch(`${baseUrl}/shop?myProduct=true`, {
    next: {
      revalidate: 10,
    },
  });
  const myproducts = await resMyProduct.json();

  return (
    <div className="shop_mydesign">
      <h2>Top sản phẩm của mình</h2>
      <div className="shop_mydesign_list">
        {myproducts?.data.map((product, index) => (
          <ShopProductCard data={product} index={product._id || index} />
        ))}
      </div>
    </div>
  );
};
