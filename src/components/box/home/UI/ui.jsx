import React from "react";
import { BlogCardVertical } from "../../blog/card/blogCard";

const Ui = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const resUI = await fetch(
    `${baseUrl}/blogs/recommend/6731c6cf74455e6ae685d703`,
    {
      next: {
        revalidate: 10,
      },
    }
  );

  const topUi = await resUI.json();

  return (
    <>
      <div className="home_ui" id="home_ui">
        {topUi.data.length > 0 && (
          <>
            <h2>UI cho ứng dụng</h2>
            <div className="home_ui_list">
              {topUi.data.map((ui, index) => (
                <BlogCardVertical
                  data={ui}
                  index={ui._id || index}
                  nameCategory={ui.categoryInfo.categoryName}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Ui;
