"use client";
import { shopApi } from "@/api/shop";
import React, { useEffect, useState } from "react";
import { ShopProductCard } from "../card/shopCard";

const AdsMyDesign = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      const res = await shopApi.getProduct();
      setProduct(res?.data?.data);
    };
    getProduct();
  }, []);
  return (
    <div className="shop_ads_product">
      <h2>Những sản phẩm của Cloudy</h2>
      <div className="list">
        {product?.map((item, i) => (
          <ShopProductCard data={item} index={i} key={i || item._id} />
        ))}
      </div>
    </div>
  );
};

export default AdsMyDesign;
