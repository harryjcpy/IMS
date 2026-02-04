import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Form, Card } from 'react-bootstrap';
import { fetchEnrollments, createEnrollment, deleteEnrollment } from '../../redux/slices/enrollmentSlice';
import { fetchStudents } from '../../redux/slices/studentSlice';
import { fetchCourses } from '../../redux/slices/courseSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const EnrollmentManagement = () => {
  const dispatch = useDispatch();
  const { enrollments, loading } = useSelector((state) => state.enrollment);
  const { students } = useSelector((state) => state.student);
  const { courses } = useSelector((state) => state.course);
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    myStudent: { id: '' },
    myCourse: { id: '' },
    enrollDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    dispatch(fetchEnrollments());
    dispatch(fetchStudents());
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleClose = () => {
    setShowModal(false);
    setFormData({ myStudent: { id: '' }, myCourse: { id: '' }, enrollDate: new Date().toISOString().split('T')[0] });
  };

  const handleShow = () => setShowModal(true);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this enrollment?')) {
      dispatch(deleteEnrollment(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEnrollment(formData));
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'studentId') {
      setFormData({ ...formData, myStudent: { id: value } });
    } else if (name === 'courseId') {
      setFormData({ ...formData, myCourse: { id: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  if (loading && enrollments.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Enrollment Management</h4>
          <Button variant="primary" onClick={handleShow}>
            Enroll Student
          </Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Student Name</th>
                <th>Roll No</th>
                <th>Course</th>
                <th>Enrollment Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment) => (
                <tr key={enrollment.id}>
                  <td>{enrollment.id}</td>
                  <td>{enrollment.myStudent?.myUser?.name || 'N/A'}</td>
                  <td>{enrollment.myStudent?.rollNo || 'N/A'}</td>
                  <td>{enrollment.myCourse?.courseName || 'N/A'}</td>
                  <td>{enrollment.enrollDate}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(enrollment.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enroll Student in Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select Student</Form.Label>
              <Form.Select
                name="studentId"
                value={formData.myStudent.id}
                onChange={handleChange}
                required
              >
                <option value="">Choose a student...</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.myUser?.name} - {student.rollNo}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Course</Form.Label>
              <Form.Select
                name="courseId"
                value={formData.myCourse.id}
                onChange={handleChange}
                required
              >
                <option value="">Choose a course...</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.courseName} - {course.courseCode}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Enrollment Date</Form.Label>
              <Form.Control
                type="date"
                name="enrollDate"
                value={formData.enrollDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Enroll
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EnrollmentManagement;
