import React, { Suspense } from "react";
import { BoxTabControlFeedback } from "./tab/boxTabControl";

const BoxListFeedbackSong = ({ data }) => {
  return (
    <div className="box_list_feedback_song">
      {data.map((item, index) => (
        <div
          className="feedback_song"
          data-feedbackcontent={item._id}
          key={item._id}
        >
          <Suspense fallback={<p>Loadding...</p>}>
            <BoxTabControlFeedback />
          </Suspense>
          <div className="box_list_feedback_song_content">
            <div
              className="box_list_feedback_song_tab_content active tiptap"
              data-content="lyrics"
              dangerouslySetInnerHTML={{ __html: item.userLyrics }}
            ></div>
            <div
              className="box_list_feedback_song_tab_content tiptap"
              data-content="chords"
              dangerouslySetInnerHTML={{ __html: item.userChords }}
            ></div>
            <div
              className="box_list_feedback_song_tab_content tiptap"
              data-content="explain"
              dangerouslySetInnerHTML={{ __html: item.userExplain }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoxListFeedbackSong;
