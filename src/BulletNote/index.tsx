import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BulletNotePage from './BulletNotePage';
import Redirect from './containers/Redirect';
import { logInParam } from './config';
import LoginPart, { LoginPartWithAuth } from './containers/LoginPart';
import NotFoundPage from './components/CommonComponents/NotFoundPage';

const BulletNote = () => {
  return (
    <Router>
      <Switch>
        <Route 
          exact
          path={'/'}
          component={Redirect} />
        <Route 
          exact
          path={`/${logInParam}`}
          component={LoginPart} />
        <Route
          exact
          path={'/bullet-note/:userId'}
          component={BulletNotePage} />
        <Route 
          component={NotFoundPage}
        />
      </Switch>
    </Router>
  );
};



export default BulletNote;