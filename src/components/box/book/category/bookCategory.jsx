import React from "react";
import { BookCategoryCard } from "../card/bookCard";

const BookCategory = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const resCategory = await fetch(`${baseUrl}/category?q=book`, {
    next: {
      revalidate: 10,
    },
  });
  const { data } = await resCategory.json();

  return (
    <div className="book_category">
      <h2>Thể loại</h2>
      <div className="book_category_list">
        {data.map((item, index) => (
          <BookCategoryCard data={item} index={item._id || index} />
        ))}
      </div>
    </div>
  );
};

export default BookCategory;
