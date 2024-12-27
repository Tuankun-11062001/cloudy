import React from "react";
import { ShopCategoryCard } from "../card/shopCard";
import { ShopExpandCategory } from "../button/shopButton";

const ShopCategory = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const resCategory = await fetch(`${baseUrl}/category?q=shop`, {
    next: {
      revalidate: 10,
    },
  });

  const categories = await resCategory.json();

  return (
    <div className="shop_category">
      <div className="shop_category_head">
        <h2>Thể loại</h2>
        <ShopExpandCategory />
      </div>
      <div className="shop_category_list">
        {categories.data.map((category, index) => (
          <ShopCategoryCard data={category} index={category._id || index} />
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
