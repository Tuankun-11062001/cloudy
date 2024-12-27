"use client";
import { appSvg } from "@/data/svg";
import { useRouter } from "next/navigation";

export const ShopBack = () => {
  const router = useRouter();
  return (
    <p className="shop_back" onClick={() => router.back()}>
      {appSvg.arrowDown}
    </p>
  );
};

export const ShopExpandCategory = () => {
  const handleExpandCategory = (e) => {
    const parentCategory = e.target.closest(".shop_category");
    const listCategory = parentCategory.querySelector(".shop_category_list");
    listCategory.classList.toggle("active");
    e.target.classList.toggle("active");
  };
  return (
    <p className="shop_expand_category_button" onClick={handleExpandCategory}>
      {appSvg.arrowDown}
    </p>
  );
};
