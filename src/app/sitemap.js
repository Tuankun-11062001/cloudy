import { blogsApi } from "@/api/blogs";
import { bookApi } from "@/api/book";
import { lyricsApi } from "@/api/lyrics";
import { shopApi } from "@/api/shop";

export const revalidate = 10;

export default async function sitemap() {
  // lyrics
  const lyricsAPI = async () => {
    try {
      const data = await lyricsApi.getLyrics();
      return data?.data || [];
    } catch (error) {
      console.error("Error fetching lyrics:", error);
      return [];
    }
  };

  const lyrics = await lyricsAPI();

  const lyricsUrls = lyrics?.data?.map((lyric) => ({
    url: `https://www.storecloudy.com/lyrics/${lyric.title}`,
    lastModified: new Date(lyric.updatedAt),
  }));

  // book
  const getBooks = async () => {
    try {
      const data = await bookApi.getBook();
      return data?.data || []; // Đảm bảo trả về mảng nếu không có dữ liệu
    } catch (error) {
      console.error("Error fetching books:", error);
      return []; // Trả về mảng rỗng nếu có lỗi
    }
  };

  const books = await getBooks();

  const booksUrls = books?.data?.map((book) => ({
    url: `https://www.storecloudy.com/book/${book.title}`,
    lastModified: new Date(book.updatedAt),
  }));

  // blog
  const getBlogs = async () => {
    try {
      const data = await blogsApi.getBlogs();
      return data?.data || []; // Đảm bảo trả về mảng nếu không có dữ liệu
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return []; // Trả về mảng rỗng nếu có lỗi
    }
  };

  const blogs = await getBlogs();

  const blogsUrls = blogs?.data?.map((blog) => ({
    url: `https://www.storecloudy.com/blog/${blog.title}`,
    lastModified: new Date(blog.updatedAt),
  }));

  // shop
  const getProducts = async () => {
    try {
      const data = await shopApi.getProduct();
      return data?.data || []; // Đảm bảo trả về mảng nếu không có dữ liệu
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Trả về mảng rỗng nếu có lỗi
    }
  };

  const products = await getProducts();

  const productsUrls = products?.data?.map((product) => ({
    url: `https://www.storecloudy.com/shop/${product.title}`,
    lastModified: new Date(product.updatedAt),
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
