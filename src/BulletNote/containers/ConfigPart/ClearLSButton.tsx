import React, { useCallback } from 'react';
import { Box, Button } from '@material-ui/core';
import HandleDataInLocalStorage from 'BulletNote/functions/HandleDataInLocalStorage';

const clearLSAlert = 'Do you sure to clear local storage?';

const CLearLSButton = () => {
  const handleClearLocalStorage = useCallback(() => {
    if(window.confirm(clearLSAlert)) {
      HandleDataInLocalStorage.clearMessageListLS();
    }
  }, []);
  
  return (
    <Button
      onClick={handleClearLocalStorage}
    >
      {'Clear LS'}
    </Button>
  );
};

export default CLearLSButton;