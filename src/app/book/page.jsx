import BookCategory from "@/components/box/book/category/bookCategory";
import BookPopular from "@/components/box/book/popular/bookPopular";
import BookSearch from "@/components/box/book/search/bookSearch";
import { BookSlider } from "@/components/box/book/slider/bookSlider";
import React, { Suspense } from "react";

export const metadata = {
  title: "Book ",
  description:
    "Story - Love 📚 Book: I will introduce famous stories and novels, offering you moments of relaxation and creative inspiration. Reading books not only broadens your knowledge but also nurtures the soul.",
};

const BookPage = () => {
  return (
    <div className="book_page">
      <div className="head">
        <h1>Sách</h1>
        <Suspense fallback={<p>Loading..</p>}>
          <BookSearch />
        </Suspense>
        <BookSlider />
      </div>
      <div className="content">
        <BookCategory />
        <BookPopular />
      </div>
    </div>
  );
};

export default BookPage;
