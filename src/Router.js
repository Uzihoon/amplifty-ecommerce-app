import React, { useEffect, useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Profile from './Profile';
import Main from './Main';
import Admin from './Admin';

export default function Router() {
  const [current, setCurrent] = useState('main');
  useEffect(() => {
    setRoute();
    window.addEventListener('hashchange', setRoute);
    return () => window.removeEventListener('hashchange', setRoute);
  }, []);

  const setRoute = () => {
    const location = window.location.href.split('/');
    const pathname = location[location.length - 1];
    console.log('pathname: ', pathname);
    setCurrent(pathname || 'home');
  };

  return (
    <HashRouter>
      <Nav current={current} />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/admin' compoennt={Admin} />
        <Route path='/profile' component={Profile} />
        <Route component={Main} />
      </Switch>
    </HashRouter>
  );
}
