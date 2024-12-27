import { ShopAllProduct } from "@/components/box/shop/allProduct/shopAllProduct";
import ShopCategory from "@/components/box/shop/category/shopCategory";
import { ShopMyDesign } from "@/components/box/shop/myDesign/shopMyDesign";
import { ShopPartner } from "@/components/box/shop/partner/shopPartner";
import { ShopSearch } from "@/components/box/shop/search/shopSearch";
import { ShopSeason } from "@/components/box/shop/season/shopSeason";
import { ShopSlider } from "@/components/box/shop/slider/shopSlider";

export const metadata = {
  title: "Store ",
  description:
    "🏬 Cửa hàng: Tại đây, bạn sẽ tìm thấy những sản phẩm độc đáo mà tôi đã thiết kế, từ áo thun đến những món quà ý nghĩa. Tôi hy vọng những sản phẩm này sẽ mang lại niềm vui và phong cách cá nhân cho bạn.",
};

const ShopPage = () => {
  return (
    <div className="shop_page">
      <h1>Shop</h1>
      <ShopSlider />
      <ShopSearch />
      <ShopSeason />
      <ShopCategory />
      <ShopMyDesign />
      <ShopPartner />
      <ShopAllProduct />
    </div>
  );
};

export default ShopPage;
