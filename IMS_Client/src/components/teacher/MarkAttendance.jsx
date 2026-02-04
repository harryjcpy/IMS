import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Form, Button, Table, Row, Col } from 'react-bootstrap';
import { fetchStudents } from '../../redux/slices/studentSlice';
import { fetchCourses } from '../../redux/slices/courseSlice';
import { createAttendance, fetchAttendance } from '../../redux/slices/attendanceSlice';
import { fetchEnrollments } from '../../redux/slices/enrollmentSlice';
import { fetchTeachers } from '../../redux/slices/teacherSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const MarkAttendance = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.student);
  const { courses } = useSelector((state) => state.course);
  const { loading } = useSelector((state) => state.attendance);
  const { enrollments } = useSelector((state) => state.enrollment);
  const { teachers } = useSelector((state) => state.teacher);
  const { user } = useSelector((state) => state.auth);

  const [selectedCourse, setSelectedCourse] = useState('');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState({});

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchCourses());
    dispatch(fetchAttendance());
    dispatch(fetchEnrollments());
    dispatch(fetchTeachers());
  }, [dispatch]);

  // Filter students enrolled in the selected course
  const enrolledStudents = selectedCourse
    ? students.filter(student => 
        enrollments.some(enrollment => 
          enrollment.myStudent?.id === student.id && 
          enrollment.myCourse?.id === parseInt(selectedCourse)
        )
      )
    : [];

  // Find current teacher's ID
  const currentTeacher = teachers.find(t => t.myUser?.email === user?.email);

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceRecords({
      ...attendanceRecords,
      [studentId]: status
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedCourse) {
      alert('Please select a course');
      return;
    }

    if (!currentTeacher) {
      alert('Teacher profile not found');
      return;
    }

    // Submit attendance for each student
    Object.entries(attendanceRecords).forEach(([studentId, status]) => {
      const attendanceData = {
        myStudent: { id: parseInt(studentId) },
        myCourse: { id: parseInt(selectedCourse) },
        markedBy: { id: currentTeacher.id },
        attendanceDate: attendanceDate,
        status: status
      };
      dispatch(createAttendance(attendanceData));
    });

    // Reset form
    setAttendanceRecords({});
    alert('Attendance marked successfully!');
  };

  if (loading && students.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Card>
        <Card.Header>
          <h4 className="mb-0">Mark Attendance</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Select Course</Form.Label>
                  <Form.Select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} required>
                    <option value="">Choose a course...</option>
                    {courses.filter(c => c.assignedTeacher?.id === currentTeacher?.id).map(course => (
                      <option key={course.id} value={course.id}>{course.courseName}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" value={attendanceDate} onChange={(e) => setAttendanceDate(e.target.value)} required />
                </Form.Group>
              </Col>
            </Row>

            {selectedCourse && (
              <>
                <Table striped bordered hover responsive className="mt-3">
                  <thead>
                    <tr>
                      <th>Roll No</th>
                      <th>Student Name</th>
                      <th>Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrolledStudents.map((student) => (
                      <tr key={student.id}>
                        <td>{student.rollNo}</td>
                        <td>{student.myUser?.name || 'N/A'}</td>
                        <td>
                          <Form.Check
                            inline
                            type="radio"
                            label="Present"
                            name={`attendance-${student.id}`}
                            value="PRESENT"
                            onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                            checked={attendanceRecords[student.id] === 'PRESENT'}
                          />
                          <Form.Check
                            inline
                            type="radio"
                            label="Absent"
                            name={`attendance-${student.id}`}
                            value="ABSENT"
                            onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                            checked={attendanceRecords[student.id] === 'ABSENT'}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="d-flex justify-content-end">
                  <Button variant="primary" type="submit">Submit Attendance</Button>
                </div>
              </>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MarkAttendance;
