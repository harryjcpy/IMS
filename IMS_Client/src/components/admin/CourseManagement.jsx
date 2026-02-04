import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Form, Card } from 'react-bootstrap';
import { fetchCourses, createCourse, updateCourse, deleteCourse } from '../../redux/slices/courseSlice';
import { fetchTeachers } from '../../redux/slices/teacherSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const CourseManagement = () => {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state) => state.course);
  const { teachers } = useSelector((state) => state.teacher);
  
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [formData, setFormData] = useState({
    courseName: '',
    durationInMonths: 0,
    fee: 0,
    assignedTeacher: null
  });

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentCourse(null);
    setFormData({ courseName: '', durationInMonths: 0, fee: 0, assignedTeacher: null });
  };

  const handleShow = () => setShowModal(true);

  const handleEdit = (course) => {
    setIsEditing(true);
    setCurrentCourse(course);
    setFormData({
      courseName: course.courseName,
      durationInMonths: course.durationInMonths,
      fee: course.fee,
      assignedTeacher: course.assignedTeacher ? { id: course.assignedTeacher.id } : null
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      dispatch(deleteCourse(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateCourse({ id: currentCourse.id, data: formData }));
    } else {
      dispatch(createCourse(formData));
    }
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'assignedTeacher') {
      setFormData({ ...formData, assignedTeacher: value ? { id: parseInt(value) } : null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  if (loading && courses.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Course Management</h4>
          <Button variant="primary" onClick={handleShow}>Add New Course</Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Course Name</th>
                <th>Duration (Months)</th>
                <th>Fee (₹)</th>
                <th>Assigned Teacher</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.courseName}</td>
                  <td>{course.durationInMonths}</td>
                  <td>₹{course.fee.toLocaleString()}</td>
                  <td>{course.assignedTeacher?.myUser?.name || 'Not Assigned'}</td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(course)}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(course.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Course' : 'Add New Course'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Course Name</Form.Label>
              <Form.Control type="text" name="courseName" value={formData.courseName} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration (Months)</Form.Label>
              <Form.Control type="number" name="durationInMonths" value={formData.durationInMonths} onChange={handleChange} required min="1" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fee (₹)</Form.Label>
              <Form.Control type="number" name="fee" value={formData.fee} onChange={handleChange} required min="0" step="0.01" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Assigned Teacher</Form.Label>
              <Form.Select 
                name="assignedTeacher" 
                value={formData.assignedTeacher?.id || ''} 
                onChange={handleChange}
              >
                <option value="">No Teacher Assigned</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.myUser?.name} - {teacher.qualification}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">Cancel</Button>
              <Button variant="primary" type="submit">{isEditing ? 'Update' : 'Create'}</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CourseManagement;
