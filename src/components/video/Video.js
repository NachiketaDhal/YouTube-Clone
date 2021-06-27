import React from 'react';
import { AiFillEye } from 'react-icons/ai';

import './_video.scss';

const Video = () => {
  return (
    <div className="video">
      <div className="video__top">
        <img
          src="https://i.ytimg.com/vi/q2Cs5_Z3ZF0/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBcZCCpGiHmhx7XoBV7R1oBTWt8Bw"
          alt="thumbnail"
        />
        <span>05:43</span>
      </div>
      <div className="video__title">Make your Favourite juice of Summer!</div>
      <div className="video__details">
        <span>
          <AiFillEye /> 5M views • <span> 9 days ago</span>
        </span>
      </div>
      <div className="video__channel">
        <img
          src="https://yt3.ggpht.com/ytc/AKedOLTNdI-Z0GXz354JTmGNCT5Z1IO9RpEMEjQ-Hab1lg=s88-c-k-c0x00ffffff-no-rj"
          alt="channel"
        />
        <p>Ultimate Juice Makers</p>
      </div>
    </div>
  );
};

export default Video;
