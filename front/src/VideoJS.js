import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const {options, onReady} = props;

  React.useEffect(() => {

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");  // video js를 doc의 element로 추가

      videoElement.classList.add('vjs-big-play-centered');  // 추가한 videoElement에 클래스 부여 'vjs-big-play-centered'
      videoRef.current.appendChild(videoElement);   // videoRef에 child로 videoElement를 추가

      // videoElement와 options(상위 클래스로부터 받은 props)로 videojs를 생성하여 playerRef의 현재 상태로 지정
      // playerRef의 현재 상태를 player로 저장 
      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

    // You could update an existing player in the `else` block here --> 초기에 생성했던 player를 else에서 업데이트 할 수 있음.
    // on prop change, for example: --> prop(options)의 변화 등의 상황
    } else {
      // 현재 playerRef의 상태를 업데이트
      const player = playerRef.current;

      // videojs의 autoplay 기능, props인 options에 담겨져 있을 것 같음
      player.autoplay(options.autoplay);
      // src도 마찬가지로 options에 담겨져서 오나 봄
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}

export default VideoJS;