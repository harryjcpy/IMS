import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../common/Navbar';

const StudentDashboard = () => {
  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row>
          <Col md={2} className="bg-light sidebar" style={{ minHeight: '100vh' }}>
            <div className="p-3">
              <h5 className="mb-4">Student Panel</h5>
              <nav className="nav flex-column">
                <Link to="/student" className="nav-link">Dashboard</Link>
                <Link to="/student/courses" className="nav-link">My Courses</Link>
                <Link to="/student/results" className="nav-link">My Results</Link>
                <Link to="/student/attendance" className="nav-link">My Attendance</Link>
                <hr />
                <Link to="/student/change-password" className="nav-link">Change Password</Link>
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

export default StudentDashboard;
