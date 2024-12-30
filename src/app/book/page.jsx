import BookCategory from "@/components/box/book/category/bookCategory";
import BookPopular from "@/components/box/book/popular/bookPopular";
import BookSearch from "@/components/box/book/search/bookSearch";
import { BookSlider } from "@/components/box/book/slider/bookSlider";
import React, { Suspense } from "react";

export const metadata = {
  title: "Sách",
  description:
    "Câu chuyện - Tình yêu 📚 Sách: Tôi sẽ giới thiệu những câu chuyện và tiểu thuyết nổi tiếng, mang đến cho bạn những khoảnh khắc thư giãn và nguồn cảm hứng sáng tạo. Đọc sách không chỉ mở rộng kiến thức mà còn nuôi dưỡng tâm hồn.",
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
