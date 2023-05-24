import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

// homepage to render signup and login forms, and a dropdown menu to select an emotion
const Home = () => {
  return (
    <>
      <div fluid="true" className="text-light bg-dark p-5">
        <Container>
          <h1>Upliftify Ai</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">Welcome to Upliftify Ai! Please login or signup to get started.</h2>
        <Row>
          <Col md="4">
            <Card border="dark">
              <Card.Body>
                <Card.Title>Login</Card.Title>
                <Card.Text>
                  <Button className="btn-block btn-danger" href="/login">
                    Login
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card border="dark">
              <Card.Body>
                <Card.Title>Signup</Card.Title>
                <Card.Text>
                  <Button className="btn-block btn-danger" href="/signup">
                    Signup
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;

// to render the homepage, we need to add it to the App.js file in the client folder
// it is a route that will be rendered when the user navigates to the root route, or /
// import React from 'react';
