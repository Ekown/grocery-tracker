import React from 'react';
import { Link } from 'react-router-dom';
import {
    Container, Row, Col, Button
} from 'react-bootstrap';

const NotFoundPage = () => {
    const errorCode = '404';
    const errorMsg = 'We are sorry, but the page you requested was not found.';
    return (
        <Container>
            <Row>
                <Col>
                    <div className="not-found-wrapper">
                        <h1>{errorCode}</h1>
                        <p>{errorMsg}</p>
                        <Button as={Link} to="home">Back to Home</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFoundPage;
