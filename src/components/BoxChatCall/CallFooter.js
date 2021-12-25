import React, { useEffect, useState } from "react";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import VideocamOffOutlinedIcon from '@mui/icons-material/VideocamOffOutlined';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import DesktopAccessDisabledIcon from '@mui/icons-material/DesktopAccessDisabled';
import ReactTooltip from "react-tooltip";
import "./MeetingFooter.css";
const CallFooter = (props) => {
  const [streamState, setStreamState] = useState({
    mic: true,
    video: false,
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
  return (
    <div className="meeting-footer">
      <div
        className={"meeting-icons " + (!streamState.mic ? "active" : "")}
        data-tip={streamState.mic ? "Mute Audio" : "Unmute Audio"}
        onClick={micClick}
      >
        { streamState.mic ? <MicIcon/> : <MicOffIcon/>}
      </div>
      <div
        className={"meeting-icons " + (!streamState.video ? "active" : "")}
        data-tip={streamState.video ? "Hide Video" : "Show Video"}
        onClick={onVideoClick}
      >
        { streamState.video ? <VideocamOutlinedIcon/> : <VideocamOffOutlinedIcon/> }
      </div>
      <div
        className="meeting-icons"
        data-tip="Share Screen"
        onClick={onScreenClick}
      >
       { streamState.screen ? <DesktopWindowsOutlinedIcon/> : <DesktopAccessDisabledIcon/>}
      </div>
      <button onClick ={()=>props.show()}>show</button>
      <ReactTooltip />
    </div>
  );
};

export default CallFooter;