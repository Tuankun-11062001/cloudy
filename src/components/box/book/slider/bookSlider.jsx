import React, { Suspense } from "react";
import {
  BookCategorySliderControl,
  BookSliderControl,
} from "./bookSliderControl";
import { BookCategorySliderCard, BookSliderCard } from "../card/bookCard";

export const BookSlider = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const resSlider = await fetch(`${baseUrl}/books?slider=true`, {
    next: {
      revalidate: 10,
    },
  });
  const sliders = await resSlider.json();
  const { data } = sliders;

  return (
    <div className="book_slider">
      <div className="book_slider_items">
        {data &&
          data.map((slider, index) => (
            <BookSliderCard data={slider} index={slider._id || index} />
          ))}
      </div>
      {data && data.length > 0 && (
        <Suspense fallback={<p>Loading..</p>}>
          <BookSliderControl data={data} />
        </Suspense>
      )}
    </div>
  );
};

export const BookCategorySlider = ({ data }) => {
  return (
    <div className="book_category_slider">
      <Suspense fallback={<p>Loading..</p>}>
        <BookCategorySliderControl data={data} />
      </Suspense>
      <div className="book_category_slider_items">
        {data.map((book, index) => (
          <BookCategorySliderCard data={book} index={book._id || index} />
        ))}
      </div>
    </div>
  );
};
