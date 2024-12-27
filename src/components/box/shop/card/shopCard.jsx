import { appSvg } from "@/data/svg";
import Link from "next/link";

export const ShopSliderCard = ({ data, index }) => {
  return (
    <div className="shop_slider_card" key={index}>
      <div className="info">
        <h2>{data.title}</h2>
        <div>{data.description}</div>
        <div className="check">
          <Link
            href={{
              pathname: `/shop/${data?.title}`,
              query: { id: data?._id },
            }}
          >
            <p>{data.price}</p>
          </Link>
        </div>
      </div>
      <img src={data.thumbnailBanner} loading="lazy" alt={`banner`} />
    </div>
  );
};

export const ShopCategoryDetailSliderCard = ({ data, index }) => {
  return (
    <div className="shop_category_detail_slider_card" key={index}>
      <div className="info">
        <h2>{data.title}</h2>
        <p>{data.description}</p>
        <div className="check">
          <Link
            href={{
              pathname: `/shop/${data?.title}`,
              query: { id: data?._id },
            }}
          >
            <p> {data.price}!</p>
          </Link>
        </div>
      </div>
      <img src={data.thumbnailBanner} loading="lazy" alt={`banner`} />
    </div>
  );
};

export const ShopDetailSliderCard = ({ data, index }) => {
  return (
    <div className="shop_detail_slider_card" key={index}>
      <img src={data.linkImage} loading="lazy" alt={`banner`} />
    </div>
  );
};

export const ShopCategoryCard = ({ data, index }) => {
  return (
    <div className="shop_category_card" key={index}>
      <Link
        href={{
          pathname: `/shop/category/${data.categoryName}`,
          query: { name: data.categoryName, id: data._id },
        }}
      >
        <img src={data.categoryImage} loading="lazy" alt={`banner`} />
        <h4>{data.categoryName}</h4>
      </Link>
    </div>
  );
};

export const ShopProductCard = ({ data, index }) => {
  return (
    <div className="shop_product_card" key={index}>
      <Link
        href={{
          pathname: `/shop/${data?.title}`,
          query: { id: data?._id },
        }}
      >
        <img src={data?.thumbnail} loading="lazy" alt={`banner`} />
        <div className="info">
          <h3>
            <abbr title={data?.title}>{data?.title}</abbr>
          </h3>
          <p>{data?.price}</p>
        </div>
      </Link>
    </div>
  );
};

export const ShopPartnerCard = ({ data, index }) => {
  return (
    <div className="shop_partner_card" key={index}>
      <img src={data.partnerImage} loading="lazy" alt={`banner`} />
    </div>
  );
};
