"use client";
import { shopApi } from "@/api/shop";
import { appSvg } from "@/data/svg";
import React, { useEffect, useState } from "react";
import { ShopProductCard } from "../card/shopCard";

export const ShopSearch = () => {
  const [seachProduct, setSearchProduct] = useState("");
  const [products, setProducts] = useState([]);
  const handleSearch = (e) => {
    setSearchProduct(e.target.value);
  };

  useEffect(() => {
    const searchResult = document.querySelector(
      ".shop_search .shop_search_result"
    );
    if (seachProduct !== "") {
      searchResult.classList.add("active");
      const search = async () => {
        const res = await shopApi.searchProduct(`?title=${seachProduct}`);
        setProducts(res.data.data);
      };
      search();
    } else {
      searchResult.classList.remove("active");
    }
  }, [seachProduct]);
  return (
    <div className="shop_search">
      {appSvg.shopCart}
      <input
        placeholder="Mình có thể giúp gì cho bạn...."
        onChange={handleSearch}
      />
      <div className="shop_search_result">
        {products.map((product, index) => (
          <ShopProductCard data={product} index={product._id || index} />
        ))}
      </div>
    </div>
  );
};
