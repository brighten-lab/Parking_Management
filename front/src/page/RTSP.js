import React from "react";
// import JSMpeg from "@cycjimmy/jsmpeg-player";
// import Streamedian from "../Streamedian";
// import VideoFeed from "../VideoFeed.tsx";
import VideoJS from "../VideoJS";
import videojs from 'video.js';



function RTSP({setModalOpen}) {

  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: false,
    responsive: true,
    fluid: true,
    sources: [{
      // src: 'http://211.57.200.6:8083/stream/pattern/channel/0/hls/live/index.m3u8',
      src: 'http://211.57.200.6:8084/play/hls/H264_AAC/index.m3u8',
      type: 'application/x-mpegURL' //또는 'video/webm' 'application/x-mpegURL'
    }]
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  const closeRTSP = () => {
    setModalOpen(false);
  }

  // useEffect(()=>{
  //   var videoUrl = new WebSocket('ws://localhost:9999');
  //   var player = new JSMpeg.VideoElement("#video-canvas", videoUrl, {
  //     autoPlay: true,
  //   });
  //   console.log(player)
  // });

    return(
      <div>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.35)",}}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "600px",
            width: "800px",
            maxWidth: "100%",
            maxHeight: "90%",
            overflowY: "auto",
            backgroundColor: "white",
          }}
        >
          {/* <canvas></canvas>
          <div id="video-canvas" style={{ height: "480px", width: "640px"}}></div> */}
          {/* <VideoFeed src="http://211.57.200.6:8083/stream/pattern/channel/0/hls/live/index.m3u8" /> */}
          {/* <VideoJS options={videoJsOptions} onReady={handlePlayerReady} /> */}
            <video
              // id="rtspstream"
              // style={{width:"800px"}}
              // controls
              autoPlay
              // src="http://211.57.200.6:8084/play/hls/H264_AAC/index.m3u8"
              // src="http://211.57.200.6:8083/stream/pattern/channel/0/hls/live/index.m3u8"
              muted>
                
              <source src="http://211.57.200.6:8083/stream/pattern/channel/0/hls/live/index.m3u8" type="video/m3u8"/>

            </video>
          <button onClick={closeRTSP}>닫기</button>
        </div>
      </div>
    );
}
export default RTSP;