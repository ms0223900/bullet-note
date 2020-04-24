import React from 'react';
import { Box } from '@material-ui/core';
import { BulletNoteRouteProps } from './types';
import { Route } from 'react-router';
import BulletNotePage from './BulletNotePage';

const BulletNoteRoute = (props: BulletNoteRouteProps) => {
  const {
    match
  } = props;
  
  return (
    <>
      <Route 
        path={`${match?.path}/:userId`}
        component={BulletNotePage}
      />
    </>
  );
};

export default BulletNoteRoute;