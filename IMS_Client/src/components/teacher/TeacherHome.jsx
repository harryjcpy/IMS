import React, { useEffect, useMemo } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses } from '../../redux/slices/courseSlice';
import { fetchEnrollments } from '../../redux/slices/enrollmentSlice';
import { fetchTeachers } from '../../redux/slices/teacherSlice';

const TeacherHome = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.course);
  const { enrollments } = useSelector((state) => state.enrollment);
  const { teachers } = useSelector((state) => state.teacher);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchEnrollments());
    dispatch(fetchTeachers());
  }, [dispatch]);

  // Find current teacher
  const currentTeacher = useMemo(() => 
    teachers.find(t => t.myUser?.email === user?.email),
    [teachers, user]
  );

  // Find courses assigned to this teacher
  const myCourses = useMemo(() => 
    courses.filter(c => c.assignedTeacher?.id === currentTeacher?.id),
    [courses, currentTeacher]
  );

  // Find students enrolled in teacher's courses
  const myStudents = useMemo(() => {
    const myCourseIds = myCourses.map(c => c.id);
    const uniqueStudents = new Set();
    enrollments.forEach(enrollment => {
      if (myCourseIds.includes(enrollment.myCourse?.id)) {
        uniqueStudents.add(enrollment.myStudent?.id);
      }
    });
    return uniqueStudents.size;
  }, [myCourses, enrollments]);

  return (
    <div>
      <h2 className="mb-4">Welcome, {user?.name}!</h2>
      <Row>
        <Col md={4}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>My Courses</Card.Title>
              <h2>{myCourses.length}</h2>
              <p className="text-muted">Assigned Courses</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>My Students</Card.Title>
              <h2>{myStudents}</h2>
              <p className="text-muted">Total Students</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title>Pending Tasks</Card.Title>
              <h2>0</h2>
              <p className="text-muted">Tasks to Complete</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card className="mt-4">
        <Card.Header>
          <h5>Teacher Information</h5>
        </Card.Header>
        <Card.Body>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
          {currentTeacher && (
            <>
              <p><strong>Qualification:</strong> {currentTeacher.qualification}</p>
              <p><strong>Experience:</strong> {currentTeacher.experienceYears} years</p>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default TeacherHome;
