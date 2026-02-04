import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const AdminHome = () => {
  const { users } = useSelector((state) => state.user);
  const { students } = useSelector((state) => state.student);
  const { teachers } = useSelector((state) => state.teacher);
  const { courses } = useSelector((state) => state.course);
  const { accountants } = useSelector((state) => state.accountant);
  const { exams } = useSelector((state) => state.exam);

  return (
    <div>
      <h2 className="mb-4">Admin Dashboard</h2>
      <Row>
        <Col md={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <h2>{users.length}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>Students</Card.Title>
              <h2>{students.length}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>Teachers</Card.Title>
              <h2>{teachers.length}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>Accountants</Card.Title>
              <h2>{accountants.length}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>Courses</Card.Title>
              <h2>{courses.length}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>Scheduled Exams</Card.Title>
              <h2>{exams.length}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card className="mt-4">
        <Card.Header>
          <h5>Welcome to IMS Admin Panel</h5>
        </Card.Header>
        <Card.Body>
          <p>Use the sidebar to navigate through different management sections.</p>
          <ul>
            <li>Manage users, students, teachers, and accountants</li>
            <li>Create and manage courses</li>
            <li>Schedule and manage exams</li>
            <li>View reports and analytics</li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminHome;
