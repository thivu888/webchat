import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import useOpenTok from 'react-use-opentok';
import {useSelector} from 'react-redux'
import CallFooter from './CallFooter'
import "./style.css"
var apiKey = "47402891";
const SESSION_ID = '2_MX40NzQwMjg5MX5-MTYzOTQwNzUwNjg0MH55bzI5cnJxTjVkSmEzSjdlTktKaWlqN0p-fg';
const TOKEN = 'T1==cGFydG5lcl9pZD00NzQwMjg5MSZzaWc9ZjhiNGQwNzc0ZDllZWUyNGY2MmNkMDdmNTlkZDcwNjU3NjM2MjYzMTpzZXNzaW9uX2lkPTJfTVg0ME56UXdNamc1TVg1LU1UWXpPVFF3TnpVd05qZzBNSDU1YnpJNWNuSnhUalZrU21FelNqZGxUa3RLYVdscU4wcC1mZyZjcmVhdGVfdGltZT0xNjM5NDA3NTI3Jm5vbmNlPTAuOTI2NzUwNDQyNDk0NjcwNCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjQxOTk5NTI1JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
const SubscriberComponent = styled('div')((props) => {
  const {number, gridColSize, gridRowSize} = props
  return ({
    display: 'grid',
    gridGap: '10px',
    padding: '10px',
    width:   '100%',
    height:  ' calc( 100vh - 60px )',
    background:'#202124',
    gridTemplateRows:`repeat(${gridRowSize},auto)`,
    gridTemplateColumns:`repeat(${gridColSize},auto)`,
  })
})

const Component = () => {
  // STEP 1: get utilities from useOpenTok;
  const [opentokProps, opentokMethods] = useOpenTok();
  const [numberSubscribe,setNumberSubscriber] = useState(0);
  const [gridColSize , setGridColSize ] = useState(1);
  const [gridRowSize  , setGridRowSize ] = useState(1);

  const [mainStream, setMainStream] = useState(null)
  const {sessionId,token} =  useSelector(state => state.tokbox)
  const { isSessionConnected, session, streams, subscribers, publisher,} = opentokProps;

  const {initSessionAndConnect, publish, subscribe, unpublish} = opentokMethods;
  useEffect(() => {
    initSessionAndConnect({
      apiKey,
      sessionId:SESSION_ID,
      token:TOKEN,
    });
  }, [SESSION_ID,TOKEN]);

  useEffect(() => {
    if(session && isSessionConnected) {
        publish({
            name: 'publisher',
            element: 'publisher',
            options: {
              insertMode: 'append',
              width: '180px',
              height: '135px',
              video: false,
              audio: true,
            },
        })
        .catch((ex) => {
            console.log(ex);
        })
    }
  },[session,isSessionConnected])

  useEffect(() => {
    if(session) {
        session.on('signal', (event) => console.log(event));
        session.on('streamCreated', (event) => {
            subscribe({ 
                name: event.stream.streamId,
                stream: event.stream,
                element: 'subscriber' ,
                options: {
                  insertMode: 'append',
                  video:false,
                  audio: true
                },
            })
        })

        session.on('streamDestroyed', (event) => {
          console.log(event)
        })
    }
  },[session])

  useEffect(() => {
    const list =  subscribers.filter(subscriber => subscriber.id !== null)
    setNumberSubscriber(list.length)
    streams.forEach(stream => {
      if(stream.videoType === 'screen') {
        setMainStream(stream)
      }
    })
  },[subscribers,streams])

  useEffect(() => {
    let gridColSize = 1;
    let gridRowSize = 1;
    if(numberSubscribe > 1 && numberSubscribe <= 4) {
      gridColSize = 2;
      gridRowSize = 1;
    }else if( numberSubscribe > 4 && numberSubscribe <= 9) {
      gridColSize = 3;
      gridRowSize = 2;
    }else if(numberSubscribe > 9 && numberSubscribe <= 16) {
      gridColSize = 4;
      gridRowSize = 3;
    }
    else if(numberSubscribe > 16 && numberSubscribe <= 25) {
      gridColSize = 5;
      gridRowSize = 4;
    }
    else if(numberSubscribe > 25 && numberSubscribe <= 36) {
      gridColSize = 6;
      gridRowSize = 5;
    }
    else if(numberSubscribe > 36 && numberSubscribe <= 49) {
      gridColSize = 7;
      gridRowSize = 6;
    }
    else if(numberSubscribe > 49 && numberSubscribe <= 64) {
      gridColSize = 8;
      gridRowSize = 7;
    }
    setGridColSize(gridColSize)
    setGridRowSize(gridRowSize)
  },[numberSubscribe])

  const onMicClick = (value) => { 
    if(publisher.publisher)
      publisher.publisher.publishAudio(value)
  }

  const onScreenClick = (value) => {
    if(publisher.publisher || publisher.publishershare) {
      if(value) {
        publish({
            name: 'publishershare',
            element: 'publisher',
            options: {
              insertMode: 'append',
              width: '180px',
              height: '135px',
              videoSource:'screen'
            },
        })
        unpublish({ name: 'publisher'})
      }else {
          publish({
            name: 'publisher',
            element: 'publisher',
            options: {
              insertMode: 'append',
              width: '180px',
              height: '135px',
            },
          }).catch((ex) => {
            console.log(ex);
          })
          unpublish({ name: 'publishershare'})
      }
    }
}

  const onVideoClick = (value) => {
    if(publisher.publisher)
    publisher.publisher.publishVideo(value)
  }
  return(
    SESSION_ID && TOKEN &&
      <div className="VideoContainer">
            <div id="publisher">
            </div>
          <SubscriberComponent 
            number ={numberSubscribe} 
            gridColSize = {gridColSize} 
            gridRowSize = {gridRowSize} 
            id = "subscriber"/>
          { mainStream &&
            <div id="share">

            </div>
          }
          <div style={{position: "fixed",left:0,right:0,bottom:0, zindex: 1001}}>
            <CallFooter onMicClick={onMicClick} onVideoClick={onVideoClick} onScreenClick={onScreenClick} show={()=>{console.log(session.getPublisherForStream(streams[0]))}} />
          </div>
      </div>
  ) 
};

export default Component;