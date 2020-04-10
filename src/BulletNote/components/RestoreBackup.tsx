import React from 'react';
import { Box, Button } from '@material-ui/core';
import { read } from 'fs';
import handleUploadData from '../functions/handleUploadData';

const RestoreBackup = () => {
  return (
    <input type={'file'} onChange={handleUploadData()} />
  );
};

export default RestoreBackup;