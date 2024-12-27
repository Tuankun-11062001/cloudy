import { blogsApi } from "@/api/blogs";
import { bookApi } from "@/api/book";
import { lyricsApi } from "@/api/lyrics";
import { shopApi } from "@/api/shop";

export const revalidate = 10;

export default async function sitemap() {
  // Helper function for API calls
  const fetchData = async (apiFunction, errorMessage) => {
    try {
      const data = await apiFunction();
      return data?.data?.data || [];
    } catch (error) {
      console.error(errorMessage, error);
      return [];
    }
  };

  // lyrics
  const lyrics = await fetchData(lyricsApi.getLyrics, "Error fetching lyrics:");
  const lyricsUrls = lyrics.map((lyric) => ({
    url: `https://www.storecloudy.com/lyrics/${encodeURIComponent(
      lyric.title
    )}`,
    lastModified: lyric.updatedAt ? new Date(lyric.updatedAt) : new Date(),
  }));

  // books
  const books = await fetchData(bookApi.getBook, "Error fetching books:");
  const booksUrls = books.map((book) => ({
    url: `https://www.storecloudy.com/book/${encodeURIComponent(book.title)}`,
    lastModified: book.updatedAt ? new Date(book.updatedAt) : new Date(),
  }));

  // blogs
  const blogs = await fetchData(blogsApi.getBlogs, "Error fetching blogs:");
  const blogsUrls = blogs.map((blog) => ({
    url: `https://www.storecloudy.com/blog/${encodeURIComponent(blog.title)}`,
    lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
  }));

  // products
  const products = await fetchData(
    shopApi.getProduct,
    "Error fetching products:"
  );
  const productsUrls = products.map((product) => ({
    url: `https://www.storecloudy.com/shop/${encodeURIComponent(
      product.title
    )}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
  }));

  return [
    {
      url: "https://www.storecloudy.com/",
      lastModified: new Date(),
    },
    {
      url: "https://www.storecloudy.com/lyrics",
      lastModified: new Date(),
    },
    {
      url: "https://www.storecloudy.com/blog",
      lastModified: new Date(),
    },
    {
      url: "https://www.storecloudy.com/book",
      lastModified: new Date(),
    },
    {
      url: "https://www.storecloudy.com/shop",
      lastModified: new Date(),
    },
    {
      url: "https://www.storecloudy.com/profile",
      lastModified: new Date(),
    },
    {
      url: "https://www.storecloudy.com/support",
      lastModified: new Date(),
    },
    ...lyricsUrls,
    ...booksUrls,
    ...blogsUrls,
    ...productsUrls,
  ];
}
