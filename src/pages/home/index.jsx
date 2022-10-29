import React from 'react';
import {
    Container, Button
} from 'react-bootstrap';

const Home = () => {
    // const errorCode = '404';
    // const errorMsg = 'We are sorry, but the page you requested was not found.';

    return (
        <Container>
          <div className="main-content">
            {/* <p>{!data ? "Loading..." : data}</p> */}
            <div>
              <Button variant="primary">Add Invoice</Button>
              <Button variant="primary">View Invoice</Button>
            </div>
          </div>
        </Container>
    );
};

export default Home;
