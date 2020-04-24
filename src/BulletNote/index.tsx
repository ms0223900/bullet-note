import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BulletNotePage from './BulletNotePage';
import Redirect from './containers/Redirect';
import { logInParam, myBulletNoteParam } from './config';
import LoginPart, { LoginPartWithAuth } from './containers/LoginPart';
import NotFoundPage from './components/CommonComponents/NotFoundPage';
import BulletNoteRoute from './BulletNoteRoute';

const BulletNote = () => {
  return (
    <Router
      // basename={process.env.REACT_APP_PUBLIC_URL}
    >
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
          path={`/${myBulletNoteParam}`}
          component={BulletNoteRoute} />
        <Route 
          component={NotFoundPage}
        />
      </Switch>
    </Router>
  );
};



export default BulletNote;