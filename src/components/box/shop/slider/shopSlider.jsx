import React, { Suspense } from "react";
import {
  ShopCategoryDetailSliderControl,
  ShopDetailSliderControl,
  ShopSliderControl,
} from "./shopSliderControl";
import {
  ShopCategoryDetailSliderCard,
  ShopDetailSliderCard,
  ShopSliderCard,
} from "../card/shopCard";

export const ShopSlider = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const resSlider = await fetch(`${baseUrl}/shop?slider=true`, {
    next: {
      revalidate: 10,
    },
  });
  const sliders = await resSlider.json();

  return (
    <div className="shop_slider">
      <Suspense>
        <ShopSliderControl data={sliders} />
      </Suspense>
      <span className="shop_slider_decor"></span>
      <div className="shop_slider_items">
        {sliders.data.map((slider, index) => (
          <ShopSliderCard index={slider._id || index} data={slider} />
        ))}
      </div>
    </div>
  );
};

export const ShopCategoryDetailSlider = ({ data }) => {
  return (
    <div className="shop_category_detail_slider">
      <Suspense>
        <ShopCategoryDetailSliderControl data={data} />
      </Suspense>
      <div className="shop_category_detail_slider_items">
        {data.map((product, index) => (
          <ShopCategoryDetailSliderCard
            data={product}
            index={product._id || index}
          />
        ))}
      </div>
    </div>
  );
};
export const ShopDetailSlider = ({ data }) => {
  return (
    <div className="shop_detail_slider">
      <Suspense>
        <ShopDetailSliderControl data={data} />
      </Suspense>
      <div className="shop_detail_slider_items">
        {data.map((image, index) => (
          <ShopDetailSliderCard data={image} index={image._id || index} />
        ))}
      </div>
    </div>
  );
};
