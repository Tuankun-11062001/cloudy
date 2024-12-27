import React from "react";
import BoxLyricsUserTab from "./tabUser/boxLyricsUserTab";
import BoxLyricsUserWordSentence from "./tabUser/boxLyricsUserWordSentence";
import BoxLyricsUserGuitarTab from "./tabUser/boxLyricsUserGuitarTab";

const BoxLyricsUserSong = () => {
  return (
    <div className="box_lyrics_user_song">
      <BoxLyricsUserTab />
      <BoxLyricsUserGuitarTab />
      <BoxLyricsUserWordSentence />
    </div>
  );
};

export default BoxLyricsUserSong;
