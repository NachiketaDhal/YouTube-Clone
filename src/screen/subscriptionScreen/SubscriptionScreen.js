import React from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal';
import { getSubscriptionChannel } from '../../redux/actions/videos.action';
import './subscriptionScreen.scss';

const SubscriptionScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscriptionChannel());
  }, [dispatch]);

  const { channels, loading } = useSelector(state => state.subscriptionChannel);

  return (
    <Container fluid>
      {!loading ? (
        channels?.map((video, i) => (
          <VideoHorizontal video={video} key={i} subScreen />
        ))
      ) : (
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default SubscriptionScreen;
