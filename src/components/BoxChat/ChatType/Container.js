import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/styles";
import InputBase from "@mui/material/InputBase";
import useStyle from "./style";
import { Typography, useMediaQuery } from "@mui/material";
import { sendMessage } from "../../../actions/socket";
import { useDispatch, useSelector } from "react-redux";
import { MessageTypes } from "../../../constant/types";
import InputFile from "./InputFile";
import Emoji from "../../Emoji";
import AudioRecord from "../AudioRecord";
import {
  setIsEndRecord,
  setIsRecord,
  setIsStartRecord,
  setUserMedia,
} from "../../../actions/Chat";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import "./class.css";
const ContainerWraper = styled("div")((props) => ({
  position: "relative",
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  "&>div": {
    display: "flex",
    alignItems: "center",
    borderTop: "1px solid #bdbdbd",
    padding: "8px 0",
    height: "100%",
    width: "100%",
    "&>div": {
      "&>svg:hover": {
        cursor: "pointer",
        borderRadius: "2px",
      },
    },
  },
}));

const Container = () => {
  const { focusContentRight } = useSelector((state) => state.main);
  const isDesktop = useMediaQuery("(min-width:800px)");
  const [isShowEmoji, setIsShowEmoji] = useState(false);
  const {
    isOpenRecordAudio,
    isStartRecordingAudio,
    isEndRecordingAudio,
    userMedia,
  } = useSelector((state) => state.chatControl);
  const dispatch = useDispatch();
  const classes = useStyle();
  const [state, setstate] = useState("");
  const handleShowEmoji = () => {
    setIsShowEmoji(!isShowEmoji);
  };

  const onChangeInput = (e) => {
    setstate(e.target.value);
  };

  const handleSendMessage = () => {
    const input = document.getElementById("chat-footer__input");
    const content = state.trim();
    if (!content) {
      input.focus();
      return;
    }
    if (state.length > 0) {
      dispatch(
        sendMessage({
          content: state,
          type: MessageTypes.MESSAGE,
        })
      );
      setTimeout(() => {
        setstate("");
      }, 1);
    }
  };
  const onKeyPress = (event) => {
    if ((event.keyCode === 13 || event.which === 13) && !event.shiftKey) {
      handleSendMessage();
      return;
    }
  };
  const handleChosenEmoji = (emojiData) => {
    const emoji = emojiData;
    setstate(state + emoji.native);
  };

  const handleClickRecord = () => {
    const mediaDevices = navigator.mediaDevices;
    if (!mediaDevices) return;
    mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        dispatch(setUserMedia(stream));
        dispatch(setIsRecord(true));
        dispatch(setIsEndRecord(false));
      })
      .catch((er) => {
        console.log("không tìm thấy");
        console.log(er);
      });
  };

  const closeRecord = () => {
    if (userMedia) {
      userMedia.getTracks().forEach((track) => {
        track.stop();
      });
    }
    dispatch(setIsRecord(false));
    dispatch(setIsStartRecord(false));
  };

  const handleStartRecord = () => {
    if (isOpenRecordAudio && !isStartRecordingAudio) {
      dispatch(setIsStartRecord(true));
    } else {
      dispatch(setIsEndRecord(true));
    }
  };
  return (
    <ContainerWraper
      isDesktop={isDesktop}
      focusContentRight={focusContentRight}
    >
      <Box sx={{ position: "relative" }}>
        {isOpenRecordAudio ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              mb: 1,
              pl: 2,
              pr: 2,
            }}
          >
            <KeyboardIcon onClick={closeRecord} />
            <Box
              sx={{
                background: "#42a5f5",
                width: "70%",
                borderRadius: "12px",
                alignContent: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={handleStartRecord}
              >
                <KeyboardVoiceIcon sx={{ color: "#fff" }} />
                <Typography sx={{ color: "#FFF" }}>Ghi âm</Typography>
              </Box>
            </Box>
            <CancelOutlinedIcon
              sx={{
                color: "#42a5f5",
                zIndex: "1000",
                cursor: "pointer",
              }}
              onClick={closeRecord}
            />
          </Box>
        ) : (
          <>
            <Box sx={{ mt: 1, alignSelf: "flex-end" }}>
              <InputFile />
            </Box>
            <Box className={classes.chatFooterTypeWraper}>
              <InputBase
                id="chat-footer__input"
                className={classes.chatFooterType}
                multiline
                maxRows={4}
                minRows={1}
                value={state}
                onChange={onChangeInput}
                onKeyPress={onKeyPress}
                placeholder="Nhắn tin..."
              />
              <Typography
                sx={{ alignSelf: "flex-end", mb: 1, ml: 1 }}
                className={classes.iconSmile + " " + classes.icon}
                onClick={handleShowEmoji}
              ></Typography>
            </Box>
            {isShowEmoji && (
              <Box
                sx={{
                  height: 200,
                  width: "100%",
                  top: "-152px",
                  position: "absolute",
                }}
              >
                <Emoji chosenEmoji={handleChosenEmoji} />
              </Box>
            )}
            <Box
              sx={{ mr: 2, alignSelf: "flex-end" }}
              onClick={handleClickRecord}
            >
              <Typography
                className={classes.iconMic + " " + classes.icon}
              ></Typography>
            </Box>
            <Box sx={{ alignSelf: "flex-end" }}>
              <Box className={classes.WrapSend} onClick={handleSendMessage}>
                <Typography
                  className={classes.iconSend + " " + classes.icon}
                ></Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </ContainerWraper>
  );
};

export default Container;
