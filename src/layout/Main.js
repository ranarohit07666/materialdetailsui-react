import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { ReferenceView } from '../components/materialCrud/ReferenceView';
import { EditMaterial } from '../components/materialCrud/EditMaterial';

export const Main = () => {
  return (
    <Box component="main" sx={{ padding: 3 }}>
      <Container maxWidth="md" size={8}>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reference" element={<ReferenceView />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/edit" element={<EditMaterial />} />
          <Route path="/edit/:id" element={<EditMaterial />} />
        </Routes>
      </Container>
    </Box>
  );
};