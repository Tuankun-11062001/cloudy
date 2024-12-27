"use client";
import { userApi } from "@/api/user";
import UserCard from "@/components/box/user/card/userCard";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const loadUsers = async (pageNumber) => {
    setLoading(true);
    const res = await userApi.getAllUser(`?page=${pageNumber}`);
    const newUsers = res.data.data;

    // Lọc các sản phẩm mới để loại bỏ các sản phẩm đã có trong danh sách
    const uniqueUsers = newUsers.filter(
      (newUser) => !users.some((user) => user._id === newUser._id)
    );

    // Kết hợp các sản phẩm cũ và mới, loại bỏ các sản phẩm trùng lặp
    const combinedUsers = [...users, ...uniqueUsers];

    // Dùng Set để đảm bảo chỉ có những sản phẩm duy nhất
    const uniqueUsersSet = Array.from(
      new Map(combinedUsers.map((user) => [user._id, user])).values()
    );

    setUsers(uniqueUsersSet);
    setTotalPages(res.data.pagination.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && !loading && page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, loading, page, totalPages]);

  return (
    <div className="user_page">
      {users.map((user) => (
        <UserCard data={user} key={user._id} />
      ))}
      {/* Thêm một loader khi đang tải */}
      {loading && <div>Loading...</div>}

      {/* Sử dụng IntersectionObserver */}
      <div ref={ref} />
    </div>
  );
};

export default UserPage;
