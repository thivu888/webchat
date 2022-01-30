import React, { useEffect, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import VideocamOffOutlinedIcon from "@mui/icons-material/VideocamOffOutlined";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import DesktopAccessDisabledIcon from "@mui/icons-material/DesktopAccessDisabled";
import ReactTooltip from "react-tooltip";
import PhoneDisabledOutlinedIcon from "@mui/icons-material/PhoneDisabledOutlined";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import "./MeetingFooter.css";
const CallFooter = (props) => {
  const [streamState, setStreamState] = useState({
    mic: true,
    video: true,
    screen: false,
  });
  const micClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        mic: !currentState.mic,
      };
    });
  };

  const onVideoClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        video: !currentState.video,
      };
    });
  };

  const onScreenClick = () => {
    setStreamState((currentState) => {
      props.onScreenClick(!currentState.screen);
      return {
        ...currentState,
        screen: !currentState.screen,
      };
    });
  };
  useEffect(() => {
    props.onMicClick(streamState.mic);
  }, [streamState.mic]);
  useEffect(() => {
    props.onVideoClick(streamState.video);
  }, [streamState.video]);

  const endCall = () => {
    if (window.socket) {
      window.socket.emit("EndCall");
    }
  };
  return (
    <div className="meeting-footer">
      <div
        className={"meeting-icons " + (!streamState.mic ? "active" : "")}
        data-tip={streamState.mic ? "Mute Audio" : "Unmute Audio"}
        onClick={micClick}
      >
        {streamState.mic ? <MicIcon /> : <MicOffIcon />}
      </div>
      <div
        className={"meeting-icons " + (!streamState.video ? "active" : "")}
        data-tip={streamState.video ? "Hide Video" : "Show Video"}
        onClick={onVideoClick}
      >
        {streamState.video ? (
          <VideocamOutlinedIcon />
        ) : (
          <VideocamOffOutlinedIcon />
        )}
      </div>
      <div
        className="meeting-icons"
        data-tip="Share Screen"
        onClick={onScreenClick}
      >
        {streamState.screen ? (
          <DesktopWindowsOutlinedIcon />
        ) : (
          <DesktopAccessDisabledIcon />
        )}
      </div>
      <div className="meeting-icons active" onClick={endCall}>
        <PhoneDisabledOutlinedIcon />
      </div>
      <ReactTooltip />
    </div>
  );
};

export default CallFooter;
