"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ShopAllProductnav } from "./shopAllProductnav";
import { ShopProductCard } from "../card/shopCard";
import { shopApi } from "@/api/shop";

export const ShopAllProduct = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [stringQuery, setStringQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState({
    category: "",
    season: "",
    partner: "",
    title: "",
    myProduct: false,
  });

  // Hàm để tải sản phẩm từ API
  const loadProducts = async (pageNumber) => {
    setLoading(true);
    const res = await shopApi.searchProduct(
      `${stringQuery ? stringQuery + "&" : "?"}page=${pageNumber}`
    );
    const newProducts = res.data.data;
    setTotalPages(res.data.pagination.totalPages);
    setProducts(newProducts);

    setLoading(false);
  };

  // Lần đầu tiên load dữ liệu khi trang load
  useEffect(() => {
    loadProducts(page);
  }, [page]);

  const changePage = (i) => {
    setPage(i);
  };

  const renderListButton = () => {
    const listButton = [];
    for (let i = 1; i <= totalPages; i++) {
      listButton.push(
        <li
          key={`nav-btn-blog-${i}`}
          className={i === page ? "item active" : "item"}
          onClick={() => changePage(i)}
        >
          {i}
        </li>
      );
    }
    return listButton;
  };

  return (
    <div className="shop_all">
      <ShopAllProductnav
        changeProduct={setProducts}
        stateQuery={query}
        changeQuery={setQuery}
        dataQuery={setStringQuery}
      />
      <div className="shop_all_list">
        {products.map((product, index) => (
          <ShopProductCard data={product} index={product._id || index} />
        ))}
        {/* Thêm một loader khi đang tải */}
        {loading && <div>Loading...</div>}
      </div>
      <div className="shop_pagination">{renderListButton()}</div>
    </div>
  );
};
