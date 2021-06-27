import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import HomeScreen from './screen/homeScreen/HomeScreen';
import './_app.scss';

const App = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <React.Fragment>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container">
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <Container fluid className="app__main">
          <HomeScreen />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default App;
