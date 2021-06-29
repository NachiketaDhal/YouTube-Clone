import React from 'react';
import './_videoMetaData.scss';
import moment from 'moment';
import numeral from 'numeral';

import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import ShowMoreText from 'react-show-more-text';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkSubscriptionStatus,
  getChannelDetails,
} from '../../redux/actions/channel.action';
const VideoMetaData = ({ video, videoId }) => {
  const {
    snippet: { channelId, publishedAt, title, description, channelTitle },
    statistics: { viewCount, likeCount, dislikeCount },
  } = video;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChannelDetails(channelId));
    dispatch(checkSubscriptionStatus(channelId));
  }, [dispatch, channelId]);

  const { channel, subscriptionStatus } = useSelector(
    state => state.channelDetails
  );

  if (!channel) {
    return <h1>Error</h1>;
  }

  const {
    statistics: { subscriberCount },
    snippet: {
      thumbnails: {
        default: { url },
      },
    },
  } = channel;

  return (
    <div className="videoMetaData py-2">
      <div className="videoMetaData__top">
        <h5>{title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            {numeral(viewCount).format('0.a')} Views •
            {moment(publishedAt).fromNow()}
          </span>

          <div>
            <span className="mx-3">
              <MdThumbUp size={26} className="mx-2" />
              {numeral(likeCount).format('0.a')}
            </span>
            <span>
              <MdThumbDown size={26} className="mx-2" />
              {numeral(dislikeCount).format('0.a')}
            </span>
          </div>
        </div>
      </div>
      <div className="videoMetaData__channel d-flex justify-content-between align-items-center my-2 py-3">
        <div className="d-flex">
          <img src={url} alt="" className="rounded-circle me-3" />
          <div className="d-flex flex-column">
            <span>{channelTitle}</span>
            <span> {numeral(subscriberCount).format('0.a')} Subscribers</span>
          </div>
        </div>

        <button
          className={`btn border-0 p-2 m-2 ${subscriptionStatus && 'btn-gray'}`}
        >
          {subscriptionStatus ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>
      <div className="videoMetaData__description">
        <ShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass="showMoreText"
          expanded={false}
        >
          {description}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetaData;
