import React, { useState } from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import ChannelScreen from './screen/channelScreen/ChannelScreen';
import HomeScreen from './screen/homeScreen/HomeScreen';
import LoginScreen from './screen/loginScreen/LoginScreen';
import SearchScreen from './screen/searchScreen/SearchScreen';
import SubscriptionScreen from './screen/subscriptionScreen/SubscriptionScreen';
import WatchScreen from './screen/watchScreen/WatchScreen';

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
    if (!accessToken && !loading) {
      history.push('/login');
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
      <Route path="/search/:query" exact>
        <Layout>
          <SearchScreen />
        </Layout>
      </Route>
      <Route path="/watch/:id" exact>
        <Layout>
          <WatchScreen />
        </Layout>
      </Route>
      <Route path="/feed/subscriptions" exact>
        <Layout>
          <SubscriptionScreen />
        </Layout>
      </Route>
      <Route path="/channel/:channelId" exact>
        <Layout>
          <ChannelScreen />
        </Layout>
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default App;
