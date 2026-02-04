import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table } from 'react-bootstrap';
import { fetchEnrollments } from '../../redux/slices/enrollmentSlice';
import { fetchCourses } from '../../redux/slices/courseSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const MyCourses = () => {
  const dispatch = useDispatch();
  const { enrollments, loading } = useSelector((state) => state.enrollment);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchEnrollments());
    dispatch(fetchCourses());
  }, [dispatch]);

  // Filter enrollments for current student
  const myEnrollments = enrollments.filter(e => e.myStudent?.myUser?.email === user?.email);

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
          {myEnrollments.length === 0 ? (
            <p className="text-muted">You are not enrolled in any courses yet.</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Duration (Months)</th>
                  <th>Fee (₹)</th>
                  <th>Enrollment Date</th>
                </tr>
              </thead>
              <tbody>
                {myEnrollments.map((enrollment) => (
                  <tr key={enrollment.id}>
                    <td>{enrollment.myCourse?.courseName || 'N/A'}</td>
                    <td>{enrollment.myCourse?.durationInMonths || 'N/A'}</td>
                    <td>₹{enrollment.myCourse?.fee?.toLocaleString() || 'N/A'}</td>
                    <td>{enrollment.enrollDate}</td>
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

export default MyCourses;
