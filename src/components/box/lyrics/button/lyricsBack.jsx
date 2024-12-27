"use client";
import { appSvg } from "@/data/svg";
import { useRouter } from "next/navigation";
import React from "react";

const LyricsBack = () => {
  const router = useRouter();
  return (
    <p className="lyrics_back" onClick={() => router.back()}>
      {appSvg.arrowDown}
    </p>
  );
};

export default LyricsBack;
