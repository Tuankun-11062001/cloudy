"use client";
import { appSvg } from "@/data/svg";
import React from "react";

const Order = ({ data }) => {
  const handleShowOrderForm = () => {
    const form = document.querySelector(".shop_order .shop_order_info");
    form.classList.toggle("active");
  };
  return (
    <div className="shop_order">
      <p onClick={handleShowOrderForm}>Order with me</p>
      <div className="shop_order_info">
        <div className="shop_order_info_head">
          <h3>Đơn đặt hàng</h3>
          <span className="close" onClick={handleShowOrderForm}>
            {appSvg.close}
          </span>
        </div>
        <div className="g">
          <label>Tên của bạn:</label>
          <input placeholder="Tên của bạn" />
        </div>
        <div className="g">
          <label>Số điện thoại:</label>
          <input placeholder="Số điện thoại" />
        </div>
        <div className="g">
          <label>Email:</label>
          <input placeholder="Email" />
        </div>
        <div className="g">
          <label>Địa chỉ:</label>
          <input placeholder="Địa chỉ" />
        </div>
        <div className="list_product">
          {data.imageProduct.map((item) => (
            <img src={item.linkImage} />
          ))}
        </div>
        <textarea placeholder="Mô tả màu bạn muốn hay thứ bạn chọn và lời nhắn đến shop" />

        <p>Order!</p>
      </div>
    </div>
  );
};

export default Order;
