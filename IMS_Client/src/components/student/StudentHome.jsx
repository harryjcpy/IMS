import React, { useEffect, useMemo } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEnrollments } from '../../redux/slices/enrollmentSlice';
import { fetchAttendance } from '../../redux/slices/attendanceSlice';
import { fetchResults } from '../../redux/slices/resultSlice';

const StudentHome = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { enrollments } = useSelector((state) => state.enrollment);
  const { attendance } = useSelector((state) => state.attendance);
  const { results } = useSelector((state) => state.result);

  useEffect(() => {
    dispatch(fetchEnrollments());
    dispatch(fetchAttendance());
    dispatch(fetchResults());
  }, [dispatch]);

  // Calculate student-specific data
  const myEnrollments = useMemo(() => 
    enrollments.filter(e => e.myStudent?.myUser?.email === user?.email),
    [enrollments, user]
  );

  const myAttendance = useMemo(() => 
    attendance.filter(a => a.myStudent?.myUser?.email === user?.email),
    [attendance, user]
  );

  const myResults = useMemo(() => 
    results.filter(r => r.myStudent?.myUser?.email === user?.email),
    [results, user]
  );

  // Calculate attendance percentage
  const attendancePercentage = useMemo(() => {
    if (myAttendance.length === 0) return 0;
    const presentCount = myAttendance.filter(a => a.status === 'PRESENT').length;
    return Math.round((presentCount / myAttendance.length) * 100);
  }, [myAttendance]);

  return (
    <div>
      <h2 className="mb-4">Welcome, {user?.name}!</h2>
      <Row>
        <Col md={4}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>My Courses</Card.Title>
              <h2>{myEnrollments.length}</h2>
              <p className="text-muted">Enrolled Courses</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>Attendance</Card.Title>
              <h2>{attendancePercentage}%</h2>
              <p className="text-muted">Overall Attendance</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>Results</Card.Title>
              <h2>{myResults.length}</h2>
              <p className="text-muted">Exam Results</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card className="mt-4">
        <Card.Header>
          <h5>Student Information</h5>
        </Card.Header>
        <Card.Body>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StudentHome;
