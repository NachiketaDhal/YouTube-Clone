import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Comments from '../../components/comments/Comments';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal';
import VideoMetaData from '../../components/videoMetaData/VideoMetaData';
import {
  getRelatedVideos,
  getVideoById,
} from '../../redux/actions/videos.action';
import './_watchScreen.scss';

const WatchScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoById(id));

    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);

  const { videos, loading: relatedVideosLoading } = useSelector(
    state => state.relatedVideos
  );

  const { video, loading } = useSelector(state => state.selectedVideo);

  return (
    <Row>
      <Helmet>
        <title>{video?.snippet?.title}</title>
      </Helmet>
      <Col lg={8}>
        <div className="watchScreen__player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            title={video?.snippet?.title}
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </div>

        {!loading ? (
          <VideoMetaData video={video} videoId={id} />
        ) : (
          <h2>Loading...</h2>
        )}
        <Comments
          videoId={id}
          totalComments={video?.statistics?.commentCount}
        />
      </Col>
      <Col lg={4}>
        {!relatedVideosLoading ? (
          videos
            ?.filter(v => v.snippet)
            ?.map((video, i) => <VideoHorizontal video={video} key={i} />)
        ) : (
          <SkeletonTheme color="#343a40" highlightColor="#3c4147">
            <Skeleton width="100%" height="130px" count={15} />
          </SkeletonTheme>
        )}
      </Col>
    </Row>
  );
};

export default WatchScreen;
