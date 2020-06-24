import React from 'react';
import { Box } from '@material-ui/core';
import NavBar from 'BulletNote/components/CommonComponents/NavBar';
import { NavBarContainerProps } from './types';
import useToggle from 'lib/customHooks/useToggle';

const NavBarContainer = (props: NavBarContainerProps) => {
  const {
    toggle,
    handleToggle
  } = useToggle(false);

  const {
    toggle: isSettingOpen,
    handleToggle: onToggleSetting,
  } = useToggle(false);

  return (
    <NavBar
      {...props}
      isDrawerOpen={toggle}
      onToggleDrawer={handleToggle}
      isSettingOpen={isSettingOpen}
      onToggleSetting={onToggleSetting}
    />
  );
};

export default NavBarContainer;