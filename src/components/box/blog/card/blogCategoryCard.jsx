import Link from "next/link";
import React from "react";

export const BlogCategoryGridCard = ({ data, index }) => {
  return (
    <div className="blog_category_grid_card" key={index}>
      <img src={data.categoryImage} loading="lazy" alt={`banner`} />
      <div className="info">
        <span>{data.categoryName}</span>
        <h3>{data.categoryName}</h3>
        <Link
          href={{
            pathname: `blog/category/${data.categoryName}`,
            query: { name: data.categoryName, id: data._id },
          }}
        >
          <p>Discovery {data.categoryName}</p>
        </Link>
      </div>
    </div>
  );
};

export const BlogCategoryCard = ({ data, index }) => {
  return (
    <div className="blog_category_card" key={index}>
      <Link
        href={{
          pathname: `/blog/category/${data.categoryName}`,
          query: { name: data.categoryName, id: data._id },
        }}
      >
        <img src={data.categoryImage} loading="lazy" alt={`banner`} />
        <span>{data.categoryName}</span>
      </Link>
    </div>
  );
};
