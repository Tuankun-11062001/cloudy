import React, { Suspense } from "react";
import BoxTabControl from "./tab/boxTabControl";
import AdsMyDesign from "../../shop/myDesign/adsMyDesign";

const BoxLyricsSong = ({ data }) => {
  return (
    <div className="box_lyrics_song">
      <Suspense fallback={<p>Loading...</p>}>
        <BoxTabControl tabContentClass=".box_lyrics_song_content_tab" />
      </Suspense>
      <div className="box_lyrics_song_content">
        <h2>{data.title} Lyrics</h2>
        <div
          className="box_lyrics_song_content_tab active tiptap"
          data-content="lyrics"
          dangerouslySetInnerHTML={{ __html: data?.lyrics }}
        >
          {/* Lyrics */}
        </div>
        <div
          className="box_lyrics_song_content_tab tiptap"
          data-content="chords"
          dangerouslySetInnerHTML={{ __html: data?.chords }}
        >
          {/* Chords */}
        </div>
        <div
          className="box_lyrics_song_content_tab tiptap"
          data-content="explain"
          dangerouslySetInnerHTML={{ __html: data?.explain }}
        >
          {/* Word - Sentence */}
        </div>
        <AdsMyDesign />
      </div>
    </div>
  );
};

export default BoxLyricsSong;
