import ButtonBack from "@/components/box/blog/button/buttonBack";
import { BlogCategoryCard } from "@/components/box/blog/card/blogCategoryCard";
import React, { Suspense } from "react";

export const metadata = {
  title: "Thể loại blog",
  description:
    "Khám phá nhiều thể loại khác nhau bao gồm Sức khỏe, Lập trình, Ngôn ngữ, Trò chơi và Kiến thức quý giá. Dù bạn đang tìm cách cải thiện sức khỏe, nâng cao kỹ năng lập trình, học một ngôn ngữ mới, tận hưởng các trò chơi thú vị, hay thu thập những hiểu biết hữu ích, bộ sưu tập chủ đề đa dạng của chúng tôi có điều gì đó dành cho mọi người. Hãy luôn cập nhật và gắn kết với những nội dung làm phong phú tâm trí và cuộc sống của bạn.",
};

const BlogCategoryPage = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const resCategory = await fetch(`${baseUrl}/category?q=blogs`, {
    next: {
      revalidate: 10,
    },
  });
  const resBannerCategory = await fetch(`${baseUrl}/event`, {
    next: {
      revalidate: 10,
    },
  });
  const category = await resCategory.json();
  const { data } = await resBannerCategory.json();

  return (
    <div className="blog_category_page">
      <div className="blog_category_page_head">
        <img src={data[0]?.bannerCategoryBlog} loading="lazy" alt={`banner`} />
        <div className="border_top"></div>
        <div className="border_bottom"></div>
        <Suspense fallback={<p>Loadding...</p>}>
          <ButtonBack />
        </Suspense>
      </div>

      <div className="blog_category_page_list">
        {category.data.map((blog, index) => (
          <BlogCategoryCard data={blog} index={blog._id || index} />
        ))}
      </div>
    </div>
  );
};

export default BlogCategoryPage;
