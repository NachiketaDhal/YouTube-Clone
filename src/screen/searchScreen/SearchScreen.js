import React from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal';
import { getVideosBySearch } from '../../redux/actions/videos.action';

const SearchScreen = () => {
  const { query } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosBySearch(query));
  }, [dispatch, query]);

  const { videos, loading } = useSelector(state => state.searchedVideos);

  return (
    <Container>
      {!loading ? (
        videos?.map((video, i) => (
          <VideoHorizontal video={video} key={i} searchScreen />
        ))
      ) : (
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default SearchScreen;
