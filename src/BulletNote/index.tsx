import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BulletNotePage from './BulletNotePage';

const BulletNote = () => {
  return (
    <Router>
      <Route
        path={'/bullet-note/:userId'}
        component={BulletNotePage as any} />
    </Router>
  );
};



export default BulletNote;