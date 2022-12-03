import { Button, Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Grid2 from '@mui/material/Unstable_Grid2';

const NotFoundPage = () => {
    const errorCode = '404';
    const errorMsg = 'We are sorry, but the page you requested was not found.';
    
    return (
        <Container>
            <Grid2 container spacing="6">
                <div className="not-found-wrapper">
                    <h1 className="title">{errorCode}</h1>
                    <p>{errorMsg}</p>
                    <Button as={Link} to="home">Back to Home</Button>
                </div>
            </Grid2>
        </Container>
    );
};

export default NotFoundPage;
