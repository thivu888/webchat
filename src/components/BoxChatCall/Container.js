import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import useOpenTok from "react-use-opentok";
import { useSelector } from "react-redux";
import CallFooter from "./CallFooter";
import "./style.css";
var apiKey = "47402891";
const SubscriberComponent = styled("div")((props) => {
  const { number, gridColSize, gridRowSize } = props;
  return {
    display: "grid",
    gridGap: "10px",
    padding: "10px",
    width: "100%",
    height: " calc( 100vh - 60px )",
    background: "#202124",
    gridTemplateRows: `repeat(${gridRowSize},auto)`,
    gridTemplateColumns: `repeat(${gridColSize},auto)`,
  };
});

const Component = () => {
  // STEP 1: get utilities from useOpenTok;
  const [opentokProps, opentokMethods] = useOpenTok();
  const [numberSubscribe, setNumberSubscriber] = useState(0);
  const [gridColSize, setGridColSize] = useState(1);
  const [gridRowSize, setGridRowSize] = useState(1);
  const [mainStream, setMainStream] = useState(null);
  const { sessionId, token } = useSelector((state) => state.tokbox);
  const { isSessionConnected, session, streams, subscribers, publisher } =
    opentokProps;

  const { initSessionAndConnect, publish, subscribe, unpublish } =
    opentokMethods;
  useEffect(() => {
    initSessionAndConnect({
      apiKey,
      sessionId: sessionId,
      token: token,
    });
  }, [sessionId, token]);
  useEffect(() => {
    if (session && isSessionConnected) {
      publish({
        name: "publisher",
        element: "publisher",
        options: {
          insertMode: "append",
          width: "180px",
          height: "135px",
          video: false,
          audio: true,
        },
      }).catch((ex) => {
        console.log(ex);
      });
    }
  }, [session, isSessionConnected]);

  useEffect(() => {
    if (session) {
      session.on("signal", (event) => console.log(event));
      session.on("streamCreated", (event) => {
        subscribe({
          name: event.stream.streamId,
          stream: event.stream,
          element: "subscriber",
          options: {
            insertMode: "append",
            video: false,
            audio: true,
          },
        });
      });

      session.on("streamDestroyed", (event) => {
        console.log("onEvent");
        console.log(event);
        console.log(streams);
        console.log(subscribers);
        if (streams.length < 2 || subscribers.length < 1) {
          window.socket.emit("Endcall");
        }
      });
    }
  }, [session]);

  useEffect(() => {
    const list = subscribers.filter((subscriber) => subscriber.id !== null);
    setNumberSubscriber(list.length);
    for (let i = 0; i < streams.length; i++) {
      if (streams[i].videoType === "screen") {
        setMainStream(streams[i]);
        return;
      }
    }
    setMainStream(null);
    return;
  }, [subscribers, streams]);
  console.log(streams);
  console.log(subscribers);
  useEffect(() => {
    let gridColSize = 1;
    let gridRowSize = 1;
    if (numberSubscribe > 1 && numberSubscribe <= 4) {
      gridColSize = 2;
      gridRowSize = 1;
    } else if (numberSubscribe > 4 && numberSubscribe <= 9) {
      gridColSize = 3;
      gridRowSize = 2;
    } else if (numberSubscribe > 9 && numberSubscribe <= 16) {
      gridColSize = 4;
      gridRowSize = 3;
    } else if (numberSubscribe > 16 && numberSubscribe <= 25) {
      gridColSize = 5;
      gridRowSize = 4;
    } else if (numberSubscribe > 25 && numberSubscribe <= 36) {
      gridColSize = 6;
      gridRowSize = 5;
    } else if (numberSubscribe > 36 && numberSubscribe <= 49) {
      gridColSize = 7;
      gridRowSize = 6;
    } else if (numberSubscribe > 49 && numberSubscribe <= 64) {
      gridColSize = 8;
      gridRowSize = 7;
    }
    setGridColSize(gridColSize);
    setGridRowSize(gridRowSize);
  }, [numberSubscribe]);

  const onMicClick = (value) => {
    if (publisher.publisher) publisher.publisher.publishAudio(value);
  };

  const onScreenClick = (value) => {
    if (publisher.publisher || publisher.publishershare) {
      if (value) {
        publish({
          name: "publishershare",
          element: "publisher",
          options: {
            insertMode: "append",
            width: "180px",
            height: "135px",
            videoSource: "screen",
          },
        });
        // unpublish({ name: "publisher" });
      } else {
        publish({
          name: "publisher",
          element: "publisher",
          options: {
            insertMode: "append",
            width: "180px",
            height: "135px",
          },
        }).catch((ex) => {
          console.log(ex);
        });
        // unpublish({ name: "publishershare" });
      }
    }
  };

  const onVideoClick = (value) => {
    if (publisher.publisher) publisher.publisher.publishVideo(value);
  };

  useEffect(() => {
    if (mainStream) {
      subscribe({
        name: mainStream.streamId,
        stream: mainStream,
        element: "mainstream",
        options: {
          insertMode: "append",
          video: true,
          audio: true,
        },
      });
    }
  }, [mainStream]);
  return (
    sessionId &&
    token && (
      <div className="VideoContainer">
        <div id="publisher" style={{ width: "180px", height: "135px" }}></div>
        {!mainStream && (
          <SubscriberComponent
            number={numberSubscribe}
            gridColSize={gridColSize}
            gridRowSize={gridRowSize}
            id="subscriber"
          />
        )}
        {mainStream && (
          <div
            style={{ width: "100%", height: " calc( 100vh - 60px )" }}
            id="mainstream"
          />
        )}
        <div
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zindex: 1001,
          }}
        >
          <CallFooter
            onMicClick={onMicClick}
            onVideoClick={onVideoClick}
            onScreenClick={onScreenClick}
          />
        </div>
      </div>
    )
  );
};

export default Component;
