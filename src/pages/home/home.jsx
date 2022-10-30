import React from 'react';
import "./home.scss";
import { Button, Container, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

const Home = () => {
  return (
    <Container className="home main-content">
      <Grid2 container spacing={6}>
        <Grid2>
          <h1 className="title">Welcome to Grocery Tracker App</h1>
        </Grid2>

        <Grid2 xs={12}>
          <Stack direction="column" spacing={3}>
            <Button size="large" variant="contained" href="/grocery-tracker/invoice/add">Add Invoice</Button>
            <Button size="large" variant="contained">View Invoice</Button>
          </Stack>
        </Grid2>

      </Grid2>
    </Container>
  );
};

export default Home;
