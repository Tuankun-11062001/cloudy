"use client";
import { appSvg } from "@/data/svg";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonBack = () => {
  const router = useRouter();
  return (
    <p className="blog_back" onClick={() => router.back()}>
      {appSvg.arrowDown}
    </p>
  );
};

export default ButtonBack;
