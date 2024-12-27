import React from "react";
import { ShopProductCard } from "../card/shopCard";

export const ShopRelativeProduct = async ({ idCategory }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const resRelative = await fetch(`${baseUrl}/shop?category=${idCategory}`, {
    next: {
      revalidate: 10,
    },
  });
  const { data } = await resRelative.json();
  return (
    <div className="shop_relative_product">
      <h3>Relative Products</h3>
      <div className="shop_relative_product_list">
        {data.map((product, index) => (
          <ShopProductCard data={product} index={product._id || index} />
        ))}
      </div>
    </div>
  );
};
