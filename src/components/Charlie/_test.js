import React, { useEffect } from 'react';
import DailyIframe from '@daily-co/daily-js';

const DailyCall = () => {
  useEffect(() => {
    // Load the Daily.co JS library
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@daily-co/daily-js';
    script.crossOrigin = 'anonymous';
    script.async = true;
    document.body.appendChild(script);

    // Join the call when the library has loaded
    script.onload = () => {
      const callFrame = DailyIframe.createFrame();
      callFrame.join({ url: 'https://connect2.daily.co/wuJ0Zz9JLewULZUVrHrl' });
    };

    // Clean up the script tag when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="daily-call"></div>;
};

export default DailyCall;
