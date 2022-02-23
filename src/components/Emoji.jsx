import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { EmojiData, Picker } from 'emoji-mart';

const Emoji = (props) => {
  const { chosenEmoji } = props;

  const onEmojiClick = (emojiObject) => {
    chosenEmoji(emojiObject);
  };

  return (
    <Picker
      set="twitter"
      onSelect={onEmojiClick}
      style={{
        width: '100%', zIndex: 99999, position: 'absolute',height:200,overflow:'hidden',left:'0',bottom:48
      }}
    />
  );
};

export default Emoji;
