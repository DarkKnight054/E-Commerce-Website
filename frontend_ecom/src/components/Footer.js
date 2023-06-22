import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../index.css'

const Footer = () => {
  return (
    <footer className='light_green'>
      <Container>
        <Row>
          <Col className='text-center py-3'>
          Copyright © 2018331077-81 - {new Date().getFullYear()}{' '} <br />
          CSE 448: Web Technologies Inc.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
