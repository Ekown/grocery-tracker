import React from 'react';
import "./home.scss";
import {
  Container, Button, Row, Col, Stack
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container className="home main-content">
      <Row>
        <Col>
          <h1>Welcome to Grocery Tracker App</h1>
        </Col>
      </Row>

      <Stack gap={3}>
        <Button size="lg" variant="primary" as={Link} to="/grocery-tracker/invoice/add">Add Invoice</Button>
        <Button size="lg" variant="primary">View Invoice</Button>
      </Stack>

      {/* <Row className="button-row">
        <Col xs="10">
          <Button size="lg" variant="primary" as={Link} to="/grocery-tracker/invoice/add">Add Invoice</Button>
        </Col>
      </Row> */}

      {/* <Row className="button-row">
        <Col xs="10">
          
        </Col>
      </Row> */}
    </Container>
  );
};

export default Home;
