import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const AccountantHome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h2 className="mb-4">Welcome, {user?.name}!</h2>
      <Row>
        <Col md={4}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>Total Fees Collected</Card.Title>
              <h2>₹0</h2>
              <p className="text-muted">This Month</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>Pending Payments</Card.Title>
              <h2>0</h2>
              <p className="text-muted">Students</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>Total Students</Card.Title>
              <h2>0</h2>
              <p className="text-muted">Enrolled</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card className="mt-4">
        <Card.Header>
          <h5>Accountant Information</h5>
        </Card.Header>
        <Card.Body>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
          <p className="text-muted mt-3">Use the sidebar to manage fees and generate reports.</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AccountantHome;
