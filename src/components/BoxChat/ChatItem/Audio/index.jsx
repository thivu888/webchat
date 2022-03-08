import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import playIcon from "./playIcon.svg";
import pauseIcon from "./pauseIcon.svg";
let intervalTime;

const Index = ({ src, duration }) => {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [durationCurrent, setDurationCurrent] = useState(duration);
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      clearInterval(intervalTime);
      return;
    }
    if (audioRef.current) {
      document.querySelectorAll("audio").forEach((item) => {
        if (audioRef.current !== item) {
          item.pause();
        }
      });
      document.querySelectorAll("video").forEach((item) => {
        if (audioRef.current !== item) {
          item.pause();
        }
      });
      try {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setIsPlaying(true);
        intervalTime = setInterval(() => {
          if (Math.floor(audioRef.current.currentTime) < duration) {
            setProgress(
              Math.floor((audioRef.current.currentTime / duration) * 100)
            );
            setDurationCurrent(
              Math.floor(duration - audioRef.current.currentTime)
            );
          } else if (Math.floor(audioRef.current.currentTime) === duration) {
            setProgress(100);
            setIsPlaying(false);
            setProgress(0);
            setDurationCurrent(duration);
            clearInterval(intervalTime);
          }
        }, 100);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <Box>
      <Box onClick={handlePlay} sx={{ position: "relative" }}>
        <img
          style={{
            width: "40px",
            position: "absolute",
            cursor: "pointer",
            top: 7,
            left: 10,
          }}
          src={!isPlaying ? playIcon : pauseIcon}
          alt="play"
        />
        <Box
          sx={{
            width: 250,
            height: 34,
            borderRadius: "20px",
            background: "rgba(0, 132, 255,0.8)",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: `${progress}%`,
              height: "100%",
              borderRadius: "20px",
              background: "rgba(0, 132, 255,1)",
              overflow: "hidden",
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            background: "#fff",
            color: "#0084ff",
            height: "25px",
            width: 40,
            borderRadius: "20px",
            border: "1px solid",
            textAlign: "center",
            position: "absolute",
            top: 3,
            right: 3,
          }}
        >{`${Math.floor(durationCurrent / 60)}:${Math.floor(
          durationCurrent % 60
        )}`}</Box>
      </Box>
      <audio controls ref={audioRef} style={{ display: "none" }}>
        <source src={src} type="audio/ogg" />
      </audio>
    </Box>
  );
};
export default Index;
