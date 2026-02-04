import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../common/Navbar';

const AccountantDashboard = () => {
  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row>
          <Col md={2} className="bg-light sidebar" style={{ minHeight: '100vh' }}>
            <div className="p-3">
              <h5 className="mb-4">Accountant Panel</h5>
              <nav className="nav flex-column">
                <Link to="/accountant" className="nav-link">Dashboard</Link>
                <Link to="/accountant/fees" className="nav-link">Fee Management</Link>
                <Link to="/accountant/reports" className="nav-link">Reports</Link>
                <hr />
                <Link to="/accountant/change-password" className="nav-link">Change Password</Link>
              </nav>
            </div>
          </Col>
          <Col md={10} className="p-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AccountantDashboard;
