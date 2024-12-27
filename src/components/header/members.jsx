"use client";
import React, { useEffect, useState } from "react";

import { userApi } from "@/api/user";
import Link from "next/link";

const Members = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const users = async () => {
      const res = await userApi.newLatestUser();
      setUsers(res.data.data);
    };
    users();
  }, []);

  return (
    <div className="member">
      <div className="head">
        <p>Thành viên Cloudy</p>
        <Link href="/user">Tất cả</Link>
      </div>
      <div className="list_member">
        {users.map((user, index) => (
          <abbr title={user.userName} key={user._id || index}>
            <img
              src={user.avatar}
              key={user._id}
              loading="lazy"
              alt={`banner`}
            />
          </abbr>
        ))}
      </div>
    </div>
  );
};

export default Members;
