import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../common/Navbar';

const AdminDashboard = () => {
  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row>
          <Col md={2} className="bg-light sidebar" style={{ minHeight: '100vh' }}>
            <div className="p-3">
              <h5 className="mb-4">Admin Panel</h5>
              <nav className="nav flex-column">
                <Link to="/admin" className="nav-link">Dashboard</Link>
                <Link to="/admin/users" className="nav-link">Users</Link>
                <Link to="/admin/students" className="nav-link">Students</Link>
                <Link to="/admin/teachers" className="nav-link">Teachers</Link>
                <Link to="/admin/accountants" className="nav-link">Accountants</Link>
                <Link to="/admin/courses" className="nav-link">Courses</Link>
                <Link to="/admin/exams" className="nav-link">Exams</Link>
                <Link to="/admin/enrollments" className="nav-link">Enrollments</Link>
                <hr />
                <Link to="/admin/change-password" className="nav-link">Change Password</Link>
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

export default AdminDashboard;
