import React from 'react';
import { Container } from 'react-bootstrap';

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import HomeScreen from './screen/homeScreen/HomeScreen';
import './_app.scss';

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="app__container border border-info">
        <Sidebar />
        <Container fluid className="app__main border border-warning">
          <HomeScreen />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default App;
