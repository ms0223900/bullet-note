import React from 'react';
import { Box } from '@material-ui/core';
import NavBar from 'BulletNote/components/CommonComponents/NavBar';
import { NavBarContainerProps } from './types';
import useToggle from 'BulletNote/functions/useToggle';

const NavBarContainer = (props: NavBarContainerProps) => {
  const {
    toggle,
    handleToggle
  } = useToggle(false);

  return (
    <NavBar
      {...props}
      isDrawerOpen={toggle}
      onToggleDrawer={handleToggle}
    />
  );
};

export default NavBarContainer;