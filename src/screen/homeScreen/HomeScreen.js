import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Video from '../../components/video/Video';
import CategoriesBar from '../../components/categoriesBar/CategoriesBar';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMostPopularVideos,
  // getVideosByCategory,
} from '../../redux/actions/videos.action';

// import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonVideo from '../../components/skeleton/SkeletonVideo';

const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMostPopularVideos());
  }, [dispatch]);

  const { videos, loading } = useSelector(state => state.homeVideos);
  // const {  activeCategory, } = useSelector(
  //   state => state.homeVideos
  // );

  // const fetchData = () => {
  //   if (activeCategory === 'All') dispatch(getMostPopularVideos());
  //   else {
  //     dispatch(getVideosByCategory(activeCategory));
  //   }
  // };

  return (
    <Container>
      <Row>
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
        {!loading
          ? videos.map((video, i) => (
              <Col lg={3} md={4}>
                <Video video={video} key={i} />
              </Col>
            ))
          : [...Array(20)].map((_, i) => (
              <Col lg={3} md={4} key={i}>
                <SkeletonVideo />
              </Col>
            ))}
        {/* </InfiniteScroll> */}
      </Row>
    </Container>
  );
};

export default HomeScreen;
