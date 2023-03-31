import React, { useEffect, useRef } from 'react';
import DailyIframe from '@daily-co/daily-js';

const DailyCall = () => {
  const videoEl = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (videoEl.current != null) {
      const iframeProperties = {
        url: 'https://connect2.daily.co/wuJ0Zz9JLewULZUVrHrl'
      };
      const callFrame = DailyIframe.wrap(videoEl.current, iframeProperties);
      videoEl.current.setAttribute(
        'allow',
        'microphone; camera; autoplay; display-capture'
      );
      callFrame.join();
    }
  }, []);

  return <iframe ref={videoEl} />;
};

export default DailyCall;
