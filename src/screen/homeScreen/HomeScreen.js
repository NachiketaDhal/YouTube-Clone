import React from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import CategoriesBar from '../../components/categoriesBar/CategoriesBar';
import Video from '../../components/video/Video';
import { getMostPopularVideos } from '../../redux/actions/videos.action';

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMostPopularVideos());
  }, [dispatch]);

  const videos = useSelector(state => state.homeVideos.videos);

  return (
    <Container>
      <CategoriesBar />
      <Row>
        {videos.map(video => (
          <Col lg={3} md={4} key={video.id}>
            <Video video={video} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomeScreen;
