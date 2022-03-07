import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { MessageTypes } from "../../../constant/types";
import {
  setIsEndRecord,
  setIsRecord,
  setIsStartRecord,
  updateSendFile,
} from "../../../actions/Chat";
import mediaService from "../../../services/media";
import { sendMessage } from "../../../actions/socket";

let mediaRecorder;
let intervalTime;
const limitTime = 60000; // 60s
export default function Index() {
  const [durationRecord, setDurationRecord] = useState("");
  const [progress, setProgress] = useState(0);
  const { userMedia, isEndRecordingAudio } = useSelector(
    (state) => state.chatControl
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStream = async () => {
      if (!userMedia) {
        return;
      }
      const stream = userMedia;

      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      const audioChunks = [];
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", async () => {
        if (mediaRecorder.isCancel) {
          return;
        }
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        const metadata = {
          type: "audio/mp3",
        };
        console.log(audioBlob);

        const file = new File([audioBlob], `audio.mp3`, metadata);
        console.log(file);
        handleSendFile(file, MessageTypes.AUDIO);
      });
    };

    handleStream();

    return () => {
      clearAllAction();
    };
  }, []);

  const handleSendFile = async (file, file_type) => {
    dispatch(updateSendFile(true));
    clearInterval(intervalTime);
    const listContent = [];
    const fileUpload = await mediaService.uploadFile(file, file_type);
    listContent.push(fileUpload.url);

    const message = {
      type: file_type,
      content: JSON.stringify(listContent),
    };
    dispatch(setIsEndRecord(false));
    dispatch(setIsStartRecord(false));
    dispatch(setIsRecord(false));
    dispatch(updateSendFile(false));
    dispatch(sendMessage(message));
  };

  const clearAllAction = () => {
    if (userMedia) {
      userMedia.getTracks().forEach((track) => {
        track.stop();
      });
    }
    dispatch(setIsEndRecord(false));
    dispatch(setIsStartRecord(false));
    dispatch(setIsRecord(false));
  };

  useEffect(() => {
    if (mediaRecorder && isEndRecordingAudio) {
      if (isEndRecordingAudio) {
        mediaRecorder.isCancel = true;
      }

      mediaRecorder.stop();
    }
  }, [isEndRecordingAudio]);

  useEffect(() => {
    let currentMiliSecond = 0;
    intervalTime = setInterval(() => {
      if (currentMiliSecond < limitTime) {
        currentMiliSecond += 100;
        const second = Math.floor(currentMiliSecond / 1000);
        const miliSecond = Math.floor((currentMiliSecond % 1000) / 100);
        setDurationRecord(`${second < 10 ? "0" : ""}${second}:0${miliSecond}`);
        setProgress((value) => (value >= 100 ? 100 : value + (0.1 * 100) / 60));
      } else if (currentMiliSecond === limitTime) {
        mediaRecorder.stop();
      }
    }, 100);

    return () => {
      clearInterval(intervalTime);
    };
  }, []);
  return (
    <div className="container">
      <div className="audio-recording-icon" />
      <div className="audio-recording-wave">
        <progress value={progress} max="100" className="progress">
          {progress}%
        </progress>
        <div className="duration">{durationRecord}</div>
      </div>
      <div></div>
    </div>
  );
}
