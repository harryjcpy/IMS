import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table, Badge, ProgressBar } from 'react-bootstrap';
import { fetchAttendance } from '../../redux/slices/attendanceSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const MyAttendance = () => {
  const dispatch = useDispatch();
  const { attendance, loading } = useSelector((state) => state.attendance);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAttendance());
  }, [dispatch]);

  // Filter attendance for current student
  const myAttendance = attendance.filter(a => a.myStudent?.myUser?.email === user?.email);

  // Calculate overall attendance percentage
  const totalClasses = myAttendance.length;
  const presentClasses = myAttendance.filter(a => a.status === 'PRESENT').length;
  const attendancePercentage = totalClasses > 0 ? ((presentClasses / totalClasses) * 100).toFixed(2) : 0;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Card className="mb-3">
        <Card.Header>
          <h5>Overall Attendance</h5>
        </Card.Header>
        <Card.Body>
          <h3>{attendancePercentage}%</h3>
          <ProgressBar 
            now={attendancePercentage} 
            label={`${attendancePercentage}%`}
            variant={attendancePercentage >= 75 ? 'success' : attendancePercentage >= 50 ? 'warning' : 'danger'}
          />
          <p className="mt-2 text-muted">
            Present: {presentClasses} / Total: {totalClasses}
          </p>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <h4 className="mb-0">Attendance Records</h4>
        </Card.Header>
        <Card.Body>
          {myAttendance.length === 0 ? (
            <p className="text-muted">No attendance records available.</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Course</th>
                  <th>Status</th>
                  <th>Marked By</th>
                </tr>
              </thead>
              <tbody>
                {myAttendance.map((record) => (
                  <tr key={record.id}>
                    <td>{record.attendanceDate}</td>
                    <td>{record.myCourse?.courseName || 'N/A'}</td>
                    <td>
                      <Badge bg={record.status === 'PRESENT' ? 'success' : 'danger'}>
                        {record.status}
                      </Badge>
                    </td>
                    <td>{record.markedBy?.myUser?.name || 'N/A'}</td>
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

export default MyAttendance;
