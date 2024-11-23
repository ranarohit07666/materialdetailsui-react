import React from 'react';
import { Typography, Box } from '@mui/material';

export const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#333', color: '#fff', textAlign: 'center', padding: 2, position: 'fixed', right: 0, left: 0, bottom: 0 }}>
      <Typography variant="body2"> 2024 TaskN</Typography>
    </Box>
  );
};