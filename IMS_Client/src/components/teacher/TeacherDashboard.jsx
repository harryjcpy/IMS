import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../common/Navbar';

const TeacherDashboard = () => {
  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row>
          <Col md={2} className="bg-light sidebar" style={{ minHeight: '100vh' }}>
            <div className="p-3">
              <h5 className="mb-4">Teacher Panel</h5>
              <nav className="nav flex-column">
                <Link to="/teacher" className="nav-link">Dashboard</Link>
                <Link to="/teacher/courses" className="nav-link">My Courses</Link>
                <Link to="/teacher/attendance" className="nav-link">Mark Attendance</Link>
                <Link to="/teacher/results" className="nav-link">Enter Results</Link>
                <hr />
                <Link to="/teacher/change-password" className="nav-link">Change Password</Link>
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

export default TeacherDashboard;
