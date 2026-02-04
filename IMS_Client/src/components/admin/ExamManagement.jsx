import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Form, Card } from 'react-bootstrap';
import { fetchExams, createExam } from '../../redux/slices/examSlice';
import { fetchCourses } from '../../redux/slices/courseSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const ExamManagement = () => {
  const dispatch = useDispatch();
  const { exams, loading } = useSelector((state) => state.exam);
  const { courses } = useSelector((state) => state.course);
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    myCourse: { id: '' },
    examDate: '',
    examType: ''
  });

  useEffect(() => {
    dispatch(fetchExams());
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleClose = () => {
    setShowModal(false);
    setFormData({ myCourse: { id: '' }, examDate: '', examType: '' });
  };

  const handleShow = () => setShowModal(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createExam(formData));
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'courseId') {
      setFormData({ ...formData, myCourse: { id: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  if (loading && exams.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Exam Management</h4>
          <Button variant="primary" onClick={handleShow}>Schedule New Exam</Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Course</th>
                <th>Exam Type</th>
                <th>Exam Date</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr key={exam.id}>
                  <td>{exam.id}</td>
                  <td>{exam.myCourse?.courseName || 'N/A'}</td>
                  <td>{exam.examType}</td>
                  <td>{exam.examDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule New Exam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select Course</Form.Label>
              <Form.Select name="courseId" value={formData.myCourse.id} onChange={handleChange} required>
                <option value="">Choose a course...</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.courseName}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Exam Type</Form.Label>
              <Form.Select name="examType" value={formData.examType} onChange={handleChange} required>
                <option value="">Choose exam type...</option>
                <option value="MIDTERM">Midterm</option>
                <option value="FINAL">Final</option>
                <option value="QUIZ">Quiz</option>
                <option value="PRACTICAL">Practical</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Exam Date</Form.Label>
              <Form.Control type="date" name="examDate" value={formData.examDate} onChange={handleChange} required />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">Cancel</Button>
              <Button variant="primary" type="submit">Schedule Exam</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ExamManagement;
