import React, { useEffect, useState } from 'react';
import './_videoHorizontal.scss';

import { AiFillEye } from 'react-icons/ai';
import request from '../../api';

import moment from 'moment';
import numeral from 'numeral';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const VideoHorizontal = ({ video }) => {
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails: { medium },
    },
  } = video;

  const _videoId = id?.videoId || id;
  const history = useHistory();

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request.get('/videos', {
        params: {
          part: 'contentDetails,statistics',
          id: _videoId,
        },
      });
      // console.log(items);

      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    get_video_details();
  }, [_videoId]);

  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request.get('/channels', {
        params: {
          part: 'snippet',
          id: channelId,
        },
      });
      // console.log(items);

      setChannelIcon(items[0].snippet.thumbnails.default.url);
    };
    get_channel_icon();
  }, [channelId]);

  const handleRelatedVideoClick = () => {
    history.push(`/watch/${_videoId}`);
  };

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format('mm:ss');

  return (
    <Row
      className="videoHorizontal m-1 py-2 align-align-items-center"
      onClick={handleRelatedVideoClick}
    >
      <Col xs={6} md={6} className="videoHorizontal__left">
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          className="videoHorizontal__thumbnail"
          wrapperClassName="videoHorizontal__thumbnail-wrapper"
        />
        <span className="videoHorizontal__duration">{_duration}</span>
      </Col>
      <Col xs={6} md={6} className="videoHorizontal__right p-0">
        <p className="videoHorizontal__title mb-1">{title}</p>
        <div className="videoHorizontal__details">
          <AiFillEye /> {numeral(views).format('0.a')} Views •
          {moment(publishedAt).fromNow()}
        </div>

        <div className="videoHorizontal__channel d-flex align-items-center my-1">
          {/* <LazyLoadImage
               src='https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
               effect='blur'
             
            /> */}
          <p className="mb-0">{channelTitle}</p>
        </div>
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
