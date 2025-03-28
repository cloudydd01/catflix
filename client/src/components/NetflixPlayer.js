import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-quality-levels';
import 'videojs-hls-quality-selector';
import 'videojs-pip';

function NetflixPlayer({ videoSources, subtitles }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const options = {
      controls: true,
      responsive: true,
      fluid: true,
      sources: videoSources,
      tracks: subtitles,
      controlBar: {
        children: [
          'playToggle',
          'progressControl',
          'volumePanel',
          'qualitySelector',
          'fullscreenToggle',
          'pictureInPictureToggle',
        ],
      },
      plugins: {
        qualityLevels: {},
        hlsQualitySelector: {},
        pip: {},
      },
    };

    playerRef.current = videojs(videoRef.current, options);

    playerRef.current.on('mouseenter', () => setShowControls(true));
    playerRef.current.on('mouseleave', () => setShowControls(false));

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [videoSources, subtitles]);

  return (
    <div data-vjs-player style={{ backgroundColor: '#000' }}>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default NetflixPlayer;