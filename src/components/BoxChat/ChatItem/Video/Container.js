import React, { useRef } from "react";
import { Box } from "@mui/system";
import useStyleIMG from "../Image/style";
const Container = (props) => {
  const classes = useStyleIMG();
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      document.querySelectorAll("video").forEach((item) => {
        if (videoRef.current !== item) {
          item.pause();
        }
      });
      document.querySelectorAll("audio").forEach((item) => {
        if (videoRef.current !== item) {
          item.pause();
        }
      });
      try {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      } catch (e) {
        console.error(e);
      }
    }
  };
  return (
    <Box className={classes.container} sx={{ boxShadow: 3, ml: 1 }}>
      <video
        ref={videoRef}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        controls
        onPlay={handlePlay}
      >
        <source src={props.content} />
      </video>
    </Box>
  );
};

export default Container;
