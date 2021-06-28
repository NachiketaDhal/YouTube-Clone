import React, { useState } from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import HomeScreen from './screen/homeScreen/HomeScreen';
import LoginScreen from './screen/loginScreen/LoginScreen';
import './_app.scss';

const Layout = ({ children }) => {
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
          {children}
        </Container>
      </div>
    </React.Fragment>
  );
};

const App = () => {
  const { accessToken, loading } = useSelector(state => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (!accessToken || !loading) {
      history.push('/login');
    }
    if (accessToken) {
      history.push('/');
    }
  }, [accessToken, loading, history]);

  return (
    <Switch>
      <Route path="/" exact>
        <Layout>
          <HomeScreen />
        </Layout>
      </Route>
      <Route path="/login" exact component={LoginScreen} />
      <Route path="/search" exact>
        <Layout>
          <h1>Search Page</h1>
        </Layout>
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default App;
