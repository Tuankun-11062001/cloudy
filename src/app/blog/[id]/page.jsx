import ButtonBack from "@/components/box/blog/button/buttonBack";
import BlogComments from "@/components/box/blog/comments/blogComments";
import Other from "@/components/box/blog/other/other";
import { RecommendBlogDetail } from "@/components/box/blog/recommend/recommendBlog";
import { BlogDetailVideo } from "@/components/box/blog/video/blogDetailVideo";
import { appSvg } from "@/data/svg";
import React, { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { id } = await params; // lấy id từ query param

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const resProduct = await fetch(`${serverUrl}/blogs/${id}`, {
    next: {
      revalidate: 10,
    },
  });

  const { data } = await resProduct.json();

  return {
    title: `${data.title} | Blog`,
    description: data.description,
    keywords: `${data.title}, ${data.category.name}, Blog`,
    openGraph: {
      title: data.title,
      description: data.description,
      images: data.thumbnail,
      url: `${baseUrl}/blog/${id}`,
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

const BlogDetail = async ({ params }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const { id } = await params;

  const resBlog = await fetch(`${baseUrl}/blogs/${id}`, {
    next: {
      revalidate: 10,
    },
  });

  const { data } = await resBlog.json();

  return (
    <div className="blog_detail_page">
      <div className="blog_detail_page_left">
        <div className="head">
          <div className="top">
            <Suspense>
              <ButtonBack />
            </Suspense>
            <span>{data.category.categoryName}</span>
            <p>{data.release}</p>
          </div>
          <h1>{data.title}</h1>
          <p className="des">{data.description}</p>
        </div>
        <Other data={data} />

        <div
          className="content tiptap"
          dangerouslySetInnerHTML={{ __html: data.blogContent }}
        ></div>
        <RecommendBlogDetail
          idCategory={data.category._id}
          nameCategory={data.category.categoryName}
        />
      </div>
      <div className="blog_detail_page_right">
        <BlogDetailVideo data={data} />
        <Suspense>
          <BlogComments data={data} />
        </Suspense>
      </div>
    </div>
  );
};

export default BlogDetail;
