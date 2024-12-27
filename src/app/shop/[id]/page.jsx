import { ShopBack } from "@/components/box/shop/button/shopButton";
import DetailControl from "@/components/box/shop/detailProduct/detailControl";
import { ShopMyDesign } from "@/components/box/shop/myDesign/shopMyDesign";
import { ShopRelativeProduct } from "@/components/box/shop/relativeProduct/shopRelativeProduct";
import { ShopDetailSlider } from "@/components/box/shop/slider/shopSlider";
import { appSvg } from "@/data/svg";
import Head from "next/head";
import React from "react";

export async function generateMetadata({ params }) {
  const { id } = await params; // lấy id từ query param
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const resProduct = await fetch(`${baseUrl}/shop/${id}`, {
    next: {
      revalidate: 10,
    },
  });

  const { data } = await resProduct.json();

  return {
    title: `${data.title} | Shop`,
    description: data.description,
    keywords: `${data.title}, ${data.category.name}, online shopping`,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [data.imageProduct[0]],
      // Cách chính xác để sử dụng dynamic URL trong Next.js
      url: `${baseUrl}/shop/${id}`, // sử dụng dynamic route trực tiếp
      type: "website",
    },
    twitter: {
      title: data.title,
      description: data.description,
      image: data.imageProduct[0],
      card: "summary_large_image",
    },
    icons: {
      icon: appSvg.favicon,
    },
  };
}

const ShopDetail = async ({ params }) => {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const resProduct = await fetch(`${baseUrl}/shop/${id}`, {
    next: {
      revalidate: 10,
    },
  });
  const { data } = await resProduct.json();

  return (
    <div className="shop_detail">
      <div className="shop_detail_content">
        <ShopBack />
        <div className="shop_detail_content_tag">
          <span>{data?.partner?.partnerName}</span>
          {data?.myProduct && (
            <span className="shop_detail_content_tag_design">
              Cloudy design
            </span>
          )}
        </div>
        <h1 className="shop_detail_content_title">{data?.title}</h1>
        <p className="shop_detail_content_des">{data?.description}</p>
        <DetailControl data={data} />
        <div className="shop_detail_content_act">
          <h2>{data.price}</h2>
          <a href={data.linkProduct} target="_blank">
            <p>Buy it now!</p>
          </a>
        </div>

        <div
          className="shop_detail_content_below tiptap"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        ></div>
        <ShopMyDesign />
        <ShopRelativeProduct idCategory={data.category._id} />
      </div>
      <ShopDetailSlider data={data.imageProduct} />
    </div>
  );
};

export default ShopDetail;
