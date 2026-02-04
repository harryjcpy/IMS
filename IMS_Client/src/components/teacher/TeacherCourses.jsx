import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table } from 'react-bootstrap';
import { fetchCourses } from '../../redux/slices/courseSlice';
import { fetchTeachers } from '../../redux/slices/teacherSlice';
import { fetchEnrollments } from '../../redux/slices/enrollmentSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const TeacherCourses = () => {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state) => state.course);
  const { teachers } = useSelector((state) => state.teacher);
  const { enrollments } = useSelector((state) => state.enrollment);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchTeachers());
    dispatch(fetchEnrollments());
  }, [dispatch]);

  // Find current teacher
  const currentTeacher = useMemo(() => 
    teachers.find(t => t.myUser?.email === user?.email),
    [teachers, user]
  );

  // Filter courses assigned to this teacher
  const myCourses = useMemo(() => 
    courses.filter(c => c.assignedTeacher?.id === currentTeacher?.id),
    [courses, currentTeacher]
  );

  // Calculate enrolled students for each course
  const getEnrolledCount = (courseId) => {
    return enrollments.filter(e => e.myCourse?.id === courseId).length;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Card>
        <Card.Header>
          <h4 className="mb-0">My Courses</h4>
        </Card.Header>
        <Card.Body>
          {myCourses.length === 0 ? (
            <p className="text-muted">No courses assigned yet.</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Duration (Months)</th>
                  <th>Fee (₹)</th>
                  <th>Students Enrolled</th>
                </tr>
              </thead>
              <tbody>
                {myCourses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.courseName}</td>
                    <td>{course.durationInMonths}</td>
                    <td>₹{course.fee.toLocaleString()}</td>
                    <td>{getEnrolledCount(course.id)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default TeacherCourses;
