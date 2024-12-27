import React from "react";
import { ShopPartnerCard } from "../card/shopCard";

export const ShopPartner = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const resPartner = await fetch(`${baseUrl}/partner`, {
    next: {
      revalidate: 10,
    },
  });
  const partners = await resPartner.json();

  return (
    <div className="shop_partner">
      <h2>Đối tác</h2>
      <div className="shop_partner_list">
        {partners.data.map((partner, index) => (
          <ShopPartnerCard data={partner} index={partner._id || index} />
        ))}
      </div>
    </div>
  );
};
