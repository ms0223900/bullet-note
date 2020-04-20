import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BulletNotePage from './BulletNotePage';
import Redirect from './containers/Redirect';

const BulletNote = () => {
  return (
    <Router>
      <Route 
        exact
        path={'/'}
        component={Redirect} />
      <Route
        path={'/bullet-note/:userId'}
        component={BulletNotePage} />
    </Router>
  );
};



export default BulletNote;