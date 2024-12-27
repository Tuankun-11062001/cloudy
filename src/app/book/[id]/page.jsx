import BookDetailContent from "@/components/box/book/detailContent/bookDetailContent";
import { appSvg } from "@/data/svg";
import React, { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { id } = await params; // lấy id từ query param

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const resProduct = await fetch(`${serverUrl}/books/${id}`, {
    next: {
      revalidate: 10,
    },
  });

  const { data } = await resProduct.json();

  return {
    title: `${data.title} | Books`,
    description: data.description,
    keywords: `${data.title}, ${data.category.name}, Books`,
    openGraph: {
      title: data.title,
      description: data.description,
      images: data.thumbnail,
      url: `${baseUrl}/book/${id}`,
      type: "website",
    },
    twitter: {
      title: data.title,
      description: data.description,
      image: data.thumbnail,
      card: "summary_large_image",
    },
    icons: {
      icon: appSvg.favicon,
    },
  };
}

const BookDetail = async ({ params }) => {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const resBook = await fetch(`${baseUrl}/books/${id}`, {
    next: {
      revalidate: 10,
    },
  });
  const { data } = await resBook.json();

  return (
    <div className="book_detail">
      <div className="book_detail_head">
        <img src={data.thumbnail} loading="lazy" alt={`banner-${data.title}`} />
        <div className="book_detail_head_info">
          <h1>{data.title}</h1>
          <p>{data.author}</p>
          <p>{data.description}</p>
        </div>
      </div>

      <BookDetailContent data={data} />
    </div>
  );
};

export default BookDetail;
