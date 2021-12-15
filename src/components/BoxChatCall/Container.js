import React,{useRef, useEffect, useState } from 'react'
import OT from '@opentok/client'
import { OTPublisher, OTSession, OTStreams, OTSubscriber } from 'opentok-react';
import { useSelector, useDispatch } from 'react-redux';
import "./style.css"
var apiKey = "47367041";
var sessionIdf = "2_MX40NzM2NzA0MX5-MTYzOTE1NTQ5ODY3MH5lRW5uNWtoZDhuekVsQVdJdXBsbVhvTmp-fg";
var tokenf = "T1==cGFydG5lcl9pZD00NzM2NzA0MSZzaWc9NDJhMTVjZTFlYzFkNDMyZGJhYWM5YzM0N2M3MDlhYmQ4MDBkNDdiNDpzZXNzaW9uX2lkPTJfTVg0ME56TTJOekEwTVg1LU1UWXpPVEUxTlRRNU9EWTNNSDVsUlc1dU5XdG9aRGh1ZWtWc1FWZEpkWEJzYlZodlRtcC1mZyZjcmVhdGVfdGltZT0xNjM5MTU1NTI5Jm5vbmNlPTAuODUxMzk0MTg1NDA5MzE5JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE2Mzk3NjAzMzEmY29ubmVjdGlvbl9kYXRhPTJfTVg0ME56TTJOekEwTVg1LU1UWXpPVEUxTlRRNU9EWTNNSDVsUlc1dU5XdG9aRGh1ZWtWc1FWZEpkWEJzYlZodlRtcC1mZyZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";
const DEFAULT        = "Default";
const HEADPHONE_TYPE = "Headset earpiece";
const BLUETOOTH_TYPE = "Bluetooth headset";
const Container = (props) => {
const {isVideoCall} = props;
const {audio, video, tokenId,sessionId,swtichCamera} = useSelector(state => state.tokbox)
const otPublisher = useRef(null);
const otSession   = useRef(null);
const otSubscriber   = useRef(null);
const [publisher, setPublisher] = useState(null)
const [subscriber, setSubscriber] = useState(null)
const [voice, setVoice] = useState(false)
const [isScreen,setIsScreen] = useState(false)
const [state,setState] = useState({
          partnerInfo : [],
          rotated: true,
        })

  useEffect(() => {
    getPublisher()
  },[])

  useEffect(() => {
    if(otPublisher && otPublisher.current) {
      console.log(otPublisher,otPublisher.current)
      cycleVideo();
      rotatedVideo();
    }
},[swtichCamera])

  const publisherEvent = {
    streamCreated: (event) => {
      console.log(event)
      console.log("%cOpenTok created publisher stream", 'font-weight: bold; color: red');
      // this.publicStreamReady();
    },
    streamDestroyed: event => {
      console.log("%cOpenTok Publisher stream destroyed!", 'font-weight: bold; color: red');
    }
  };

  const sessionEvent = {
    sessionConnected : (session) => {
        console.log("%cOpenTok connected", 'font-weight: bold; color: red');
        // this.updateConnectionInfo(session);
    },
    sessionDisconnected : () => { console.log("%cOpenTok disconnected", 'font-weight: bold; color: red'); },
    streamCreated:async (event) => {
        console.log("%cOpenTok created stream", 'font-weight: bold; color: red');

        // const type = this.props.callType === PrimaryUtilityTypes.VOICE ? HEADPHONE_TYPE : DEFAULT;
        await changeInputDevice();

        onSubcriber();
    },
  };

  const onSubcriber = () => {
    console.log('tranfer data')
        //this.props.tranferCallData({role: currentRole, sessionId, ownerId: this.OwnerInfo.user_id, messageType: CallEvents.SUBSCRIBE_STREAM});
  };

  const handleError = (error) => {
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
  }

  const onErrorStream = () => {
    console.log("loi stream")
    // this.props.endCallRequest({reason: CallReasons.CANNOT_JOIN_CHANNEL});
  };

  const gotStream = (stream) => {
    console.log(stream);
    const videoElement = document.querySelector('video');
    window.stream = stream;
    videoElement.srcObject = stream;
    return navigator.mediaDevices.enumerateDevices();
  };

  const changeInputDevice = async (type) => {
    const devices   = await navigator.mediaDevices.enumerateDevices();
    let audioInputs = devices.filter((device) => device.kind === "audioinput" && device.label === BLUETOOTH_TYPE);
   
    if (!audioInputs.length) {
        audioInputs = devices.filter((device) => device.kind === "audioinput");
    }
    if (audioInputs.length) {
        const constraints = {
            "audio": {
                "deviceId": audioInputs[0].deviceId,
            },
            "video": false,
        };

        navigator.mediaDevices.getUserMedia(constraints).then(gotStream).catch(handleError);
    }
  };

  const publicStreamReady = () => {
    const {sessionId, currentRole} = this.props;
    // this.props.tranferCallData({role: currentRole, sessionId, ownerId: this.OwnerInfo.user_id, messageType: CallEvents.PUBLISH_STREAM});
  };
  const rotatedVideo = () => {
    const currentRotated = state.rotated;
    const publisherElement = document.getElementsByClassName("OTPublisherContainer")[0];

    if (currentRotated) {
        publisherElement.classList.remove("OT_mirrored");
    } else {
        publisherElement.classList.add("OT_mirrored");
    }

    setState({rotated: !currentRotated});
  }

  const cycleVideo = () => {
      if(publisher)
      publisher.getPublisher().cycleVideo();
  };

  const getPublisher = () => {
    if (otPublisher) {
      setPublisher(otPublisher.current);
    }
  }
    return (
      sessionIdf && tokenf  && (
        <div className={isVideoCall ? `VideoContainer ` : 'VoiceContainer'}>
            <button style={{position:'relative',zIndex:"1000"}}>set</button>
            <div>
                <OTSession 
                  apiKey={apiKey}
                  sessionId={sessionIdf}
                  token={tokenf}
                  eventHandlers={sessionEvent}
                  ref={otSession}
                >
                  <div id="publisher">
                    <OTPublisher
                      ref={otPublisher}
                      eventHandlers={publisherEvent}
                      properties={{
                          publishAudio: true,
                          publishVideo: true,
                          facingMode: "user",
                          videoSource: `${isScreen ? 'screen' : 'camera'}`,
                          width: "200px",
                          height: "150px",
                          style: {
                              buttonDisplayMode: 'off',
                              nameDisplayMode: 'off',
                              archiveStatusDisplayMode: 'off',
                          },
                      }}
                      onError={onErrorStream}
                    />
                  </div>
                  <div className="main-layout CallContainer" style={isVideoCall ? {"background": "black"} : {}}>
                    <OTStreams>
                        <OTSubscriber
                            properties={{
                                subscribeToAudio: true,
                                subscribeToVideo: true,
                                audioVolume: 100,
                                width: "100vw",
                                height: "100vh",
                                style: {
                                    buttonDisplayMode: 'off',
                                    nameDisplayMode: 'off',
                                    archiveStatusDisplayMode: 'off',
                                },
                            }}
                            onError={onErrorStream}
                        />
                    </OTStreams>
                  </div>
                </OTSession>
          </div>
        </div>
     )
  )
}

export default Container