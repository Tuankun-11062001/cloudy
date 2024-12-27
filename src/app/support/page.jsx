import SupportForm from "@/components/support/supportForm";
import React from "react";

export const metadata = {
  title: "Hỗ trợ",
  description:
    "🙌 Hỗ trợ: Tôi rất trân trọng ý kiến đóng góp của bạn! Hãy cho tôi biết bất kỳ khó khăn nào bạn gặp phải hoặc những khu vực cần cải thiện trên trang web. Mỗi phản hồi đều là động lực để tôi hoàn thiện và phát triển hơn nữa.",
};

const SupportPage = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const resSupport = await fetch(`${baseUrl}/support`, {
    next: {
      revalidate: 10,
    },
  });

  const { data } = await resSupport.json();

  return (
    <div className="support_page">
      <h1>Hỗ trợ</h1>
      <img
        className="support_page_head"
        src={data[0].banner}
        loading="lazy"
        alt={`banner`}
      />

      <div className="support_page_content">
        {data[0].content.map((item, index) => (
          <div className="support_about" key={item._id || index}>
            <h2>{item.titleContent}</h2>
            <div
              className="tiptap"
              dangerouslySetInnerHTML={{ __html: item.content }}
            ></div>
          </div>
        ))}

        <SupportForm data={data[0]} />
      </div>
    </div>
  );
};

export default SupportPage;
