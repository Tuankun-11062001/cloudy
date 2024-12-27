import React, { Suspense } from "react";
import { SliderControl, SliderBlogCategoryControl } from "./sliderControl";
import { BoxBlogCategorySlider, BoxSliderBlog } from "../card/blogCard";

export const BlogSlider = ({ dataSlider }) => {
  const { data } = dataSlider;
  return (
    <div className="blog_slider">
      <Suspense fallback={<p>Loading..</p>}>
        <SliderControl data={data} />
      </Suspense>
      <div className="blog_slider_items">
        {data.map((blogSlider, index) => (
          <BoxSliderBlog data={blogSlider} index={blogSlider._id || index} />
        ))}
      </div>
    </div>
  );
};

export const BlogCategorySlider = ({ data }) => {
  return (
    <div className="blog_category_slider">
      <Suspense>
        <SliderBlogCategoryControl data={data} />
      </Suspense>
      <div className="blog_category_slider_items">
        {data.map((blog, index) => (
          <BoxBlogCategorySlider data={blog} index={blog._id || index} />
        ))}
      </div>
    </div>
  );
};
