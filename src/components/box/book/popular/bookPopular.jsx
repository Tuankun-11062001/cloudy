import React from "react";
import { BookCard } from "../card/bookCard";

const BookPopular = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const resTopBook = await fetch(`${baseUrl}/books/lastestBlog`, {
    next: {
      revalidate: 10,
    },
  });
  const { data } = await resTopBook.json();

  return (
    <>
      {data.map((item, index) => (
        <div className="book_popular" key={item._id || index}>
          <h2>Mới nhất của {item.categoryInfo.categoryName}</h2>
          <div className="book_popular_list">
            {item.books.map((book, index) => (
              <BookCard index={book._id || index} data={book} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default BookPopular;
