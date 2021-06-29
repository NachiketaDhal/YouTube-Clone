import React from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonVideo from '../../components/skeleton/SkeletonVideo';

import CategoriesBar from '../../components/categoriesBar/CategoriesBar';
import Video from '../../components/video/Video';
import {
  getMostPopularVideos,
  getVideosByCategory,
} from '../../redux/actions/videos.action';

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMostPopularVideos());
  }, [dispatch]);

  const { videos, activeCategory, loading } = useSelector(
    state => state.homeVideos
  );

  const fetchData = () => {
    if (activeCategory === 'All') dispatch(getMostPopularVideos());
    else dispatch(getVideosByCategory(activeCategory));
  };

  return (
    <Container>
      <CategoriesBar />
      {/* <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={
          <div className="spinner-border text-danger d-block mx-auto"></div>
        }
        className="row"
      > */}
      <Row>
        {!loading
          ? videos.map((video, i) => (
              <Col lg={3} md={4} key={i}>
                <Video video={video} />
              </Col>
            ))
          : [...Array(20)].map((_, i) => (
              <Col lg={3} md={4} key={i}>
                <SkeletonVideo />
              </Col>
            ))}
      </Row>
      {/* </InfiniteScroll> */}
    </Container>
  );
};

export default HomeScreen;
