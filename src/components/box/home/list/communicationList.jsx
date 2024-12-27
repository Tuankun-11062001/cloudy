"use client";
import { communicationApi } from "@/api/communication";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import CommunicationCard from "../card/communicationCard";

const CommunicationList = () => {
  const [communications, setCommunications] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const loadingRef = useRef(false);

  // Hàm để tải sản phẩm từ API
  const loadCommunication = async (pageNumber) => {
    if (loadingRef.current || pageNumber > totalPages) return;

    loadingRef.current = true;
    const res = await communicationApi.getCommunications(`?page=${pageNumber}`);
    const newCommunications = res.data.data;

    // Lọc các sản phẩm mới để loại bỏ các sản phẩm đã có trong danh sách
    const uniqueCommunications = newCommunications.filter(
      (newCommunication) =>
        !communications.some(
          (communication) => communication._id === newCommunication._id
        )
    );

    // Kết hợp các sản phẩm cũ và mới, loại bỏ các sản phẩm trùng lặp
    const combinedCommunication = [...communications, ...uniqueCommunications];

    // Dùng Set để đảm bảo chỉ có những sản phẩm duy nhất
    const uniqueCommunicaiotnsSet = Array.from(
      new Map(
        combinedCommunication.map((communi) => [communi._id, communi])
      ).values()
    );

    setCommunications(uniqueCommunicaiotnsSet);
    setTotalPages(res.data.pagination.totalPages);
    loadingRef.current = false;
  };

  // Lần đầu tiên load dữ liệu khi trang load
  useEffect(() => {
    loadCommunication(page);
  }, [page]);

  // Reset lại danh sách sản phẩm và page khi query thay đổi
  useEffect(() => {
    setCommunications([]); // Xóa tất cả sản phẩm cũ
    setPage(1); // Đặt lại trang về 1
  }, []);

  // Intersection Observer để phát hiện khi người dùng cuộn đến cuối trang
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1.0,
  });

  // Khi người dùng cuộn đến cuối, tải thêm dữ liệu
  useEffect(() => {
    if (inView && !loadingRef.current && page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, page, totalPages]);
  return (
    <div className="list">
      {communications.map((item, index) => (
        <CommunicationCard data={item} index={item._id || index} />
      ))}

      {/* Thêm một loader khi đang tải */}
      {loadingRef.current && <div>Loading...</div>}

      {/* Sử dụng IntersectionObserver */}
      <div ref={ref} />
    </div>
  );
};

export default CommunicationList;
