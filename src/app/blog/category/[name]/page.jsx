import ButtonBack from "@/components/box/blog/button/buttonBack";
import { BlogCardVertical } from "@/components/box/blog/card/blogCard";
import { SearchBlog } from "@/components/box/blog/search/searchBlog";
import { BlogCategorySlider } from "@/components/box/blog/slider/slider";
import { Suspense } from "react";

const DetailCategory = async ({ searchParams }) => {
  const { id, name } = await searchParams;
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const resCategory = await fetch(`${baseUrl}/blogs/recommend/${id}`, {
    next: {
      revalidate: 10,
    },
  });

  const blog = await resCategory.json();

  const blogSlide = blog.data
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <div className="blog_detail_category">
      <div className="blog_detail_category_head">
        <Suspense>
          <ButtonBack />
        </Suspense>
        <h2>Category {name}</h2>
        <SearchBlog />
      </div>
      {blogSlide.length > 0 && <BlogCategorySlider data={blogSlide} />}

      <div className="blog_detail_category_likes">
        <h2 className="blog_detail_category_title">Most Cloudy</h2>
        <div className="blog_detail_category_list">
          {blog?.data?.map((item, index) => (
            <BlogCardVertical
              data={item}
              index={item._id || index}
              nameCategory={name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailCategory;
