import React, { useRef, useEffect } from 'react';
import jsmpeg from 'jsmpeg';

const CCTVPlayer = () => {
  const canvasRef = useRef(null);
  const webSocketRef = useRef(null);

  useEffect(() => {
    // ComponentDidMount
    const canvas = canvasRef.current;
    const webSocket = new WebSocket('ws://211.57.200.6:9999');
    const player = new jsmpeg(webSocket, {
      canvas: canvas,
    });

    // ComponentWillUnmount (clean up WebSocket on unmount)
    return () => {
      webSocket.close();
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default CCTVPlayer;
