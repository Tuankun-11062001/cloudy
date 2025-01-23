import React from "react";
import { ShopProductCard } from "../../shop/card/shopCard";

const MyProduct = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const resMyProduct = await fetch(`${baseUrl}/shop?myProduct=true`, {
    next: {
      revalidate: 10,
    },
  });
  const myproducts = await resMyProduct.json();
  return (
    <div className="home_myProduct">
      <h2>Những thiết kế áo Cloudy</h2>
      <div className="home_myProduct_list">
        {myproducts?.data.map((product, index) => (
          <ShopProductCard data={product} index={product._id || index} />
        ))}
      </div>
    </div>
  );
};

export default MyProduct;
