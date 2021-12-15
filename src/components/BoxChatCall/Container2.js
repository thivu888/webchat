import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import useOpenTok from 'react-use-opentok';
import "./style.css"
var apiKey = "47367041";
var sessionId = "2_MX40NzM2NzA0MX5-MTYzOTE1NTQ5ODY3MH5lRW5uNWtoZDhuekVsQVdJdXBsbVhvTmp-fg";
var token = "T1==cGFydG5lcl9pZD00NzM2NzA0MSZzaWc9NDJhMTVjZTFlYzFkNDMyZGJhYWM5YzM0N2M3MDlhYmQ4MDBkNDdiNDpzZXNzaW9uX2lkPTJfTVg0ME56TTJOekEwTVg1LU1UWXpPVEUxTlRRNU9EWTNNSDVsUlc1dU5XdG9aRGh1ZWtWc1FWZEpkWEJzYlZodlRtcC1mZyZjcmVhdGVfdGltZT0xNjM5MTU1NTI5Jm5vbmNlPTAuODUxMzk0MTg1NDA5MzE5JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE2Mzk3NjAzMzEmY29ubmVjdGlvbl9kYXRhPTJfTVg0ME56TTJOekEwTVg1LU1UWXpPVEUxTlRRNU9EWTNNSDVsUlc1dU5XdG9aRGh1ZWtWc1FWZEpkWEJzYlZodlRtcC1mZyZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

const SubscriberComponent = styled('div')((props) => {
  const {number} = props
  return ({
    display: 'grid',
    gridGap: '10px',
    padding: '10px',
    width: '100%',
    height: '100vh',
    gridTemplateColumns:`${number % 2 !== 0 ? `repeat(${Math.floor(number/2+1)},auto)` : `repeat(${number/2},auto)` }`,
    gridTemplateRows:`repeat(${Math.floor(number/2)},auto)`,
  })
})

const Component = () => {
  // STEP 1: get utilities from useOpenTok;
  const [opentokProps, opentokMethods] = useOpenTok();
  const [numberSubscribe,setNumberSubscriber] = useState(0)
  const {
    // connection info
    isSessionInitialized,
    connectionId,
    isSessionConnected,

    // connected data
    session,
    connections,
    streams,
    subscribers,
    publisher,
  } = opentokProps;

  const {
    initSessionAndConnect,
    disconnectSession,
    publish,
    unpublish,
    subscribe,
    unsubscribe,
    sendSignal,
    initPublisher,
    publishPublisher,
    removePublisher,
  } = opentokMethods;

  useEffect(() => {
        initSessionAndConnect({
          apiKey,
          sessionId,
          token,
        });
  }, []);

  useEffect(() => {
    if(session && isSessionConnected) {
        publish({
            name: 'video',
            element: 'publisher',
            options: {
              insertMode: 'append',
              width: '180px',
              height: '150px',
            },
            style: {
                buttonDisplayMode: 'on',
                nameDisplayMode: 'on',
                archiveStatusDisplayMode: 'on',
            },
        })
        .catch((ex) => {
            console.log(ex);
        })
    }
  },[session,isSessionConnected])
  useEffect(() => {
    if(session) {
        session.on('streamCreated', (event) => {
            subscribe({ 
                name: 'sub1',
                stream: event.stream, 
                element: 'subscriber' ,
                options: {
                  insertMode: 'append',
                },
                style: {
                    buttonDisplayMode: 'on',
                    nameDisplayMode: 'on',
                    archiveStatusDisplayMode: 'on',
                },
            })
        })
    }
  },[session])

  useEffect(() => {
    const list =  subscribers.filter(subscriber => subscriber.id !== null)
    setNumberSubscriber(list.length)
  },[subscribers,streams])


  return(
   (
      <div className="VideoContainer">
          <div id="publisher">
          </div>
          <SubscriberComponent number ={numberSubscribe} id = "subscriber"/>
          <div id="share">

          </div>
      </div>
    )
  ) 
};

export default Component;