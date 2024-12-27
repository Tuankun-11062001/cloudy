import { ShopBack } from "@/components/box/shop/button/shopButton";
import { ShopProductCard } from "@/components/box/shop/card/shopCard";
import { ShopCategoryDetailSlider } from "@/components/box/shop/slider/shopSlider";
import React from "react";

const ShopCategoryDetail = async ({ searchParams }) => {
  const { id } = await searchParams;
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const resProduct = await fetch(`${baseUrl}/shop/category/${id}`, {
    next: {
      revalidate: 10,
    },
  });

  const products = await resProduct.json();

  const sliders = products.data.slice(0, 4);

  return (
    <div className="shop_category_detail">
      <div className="shop_category_detail_head">
        <ShopBack />
        <h1>Category {name}</h1>
      </div>

      {products.data.length > 0 && <ShopCategoryDetailSlider data={sliders} />}

      <div className="shop_category_detail_list">
        {products.data.length > 0 &&
          products.data.map((product, index) => (
            <ShopProductCard data={product} index={product._id || index} />
          ))}
      </div>
    </div>
  );
};

export default ShopCategoryDetail;
