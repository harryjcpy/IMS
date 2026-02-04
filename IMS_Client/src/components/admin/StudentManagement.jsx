import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Form, Card } from 'react-bootstrap';
import { fetchStudents, createStudent, updateStudent, deleteStudent } from '../../redux/slices/studentSlice';
import { fetchUsers } from '../../redux/slices/userSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const StudentManagement = () => {
  const dispatch = useDispatch();
  const { students, loading } = useSelector((state) => state.student);
  const { users } = useSelector((state) => state.user);
  
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [formData, setFormData] = useState({
    myUser: { id: '' },
    rollNo: '',
    admissionDate: ''
  });

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentStudent(null);
    setFormData({ myUser: { id: '' }, rollNo: '', admissionDate: '' });
  };

  const handleShow = () => setShowModal(true);

  const handleEdit = (student) => {
    setIsEditing(true);
    setCurrentStudent(student);
    setFormData({
      myUser: { id: student.myUser?.id || '' },
      rollNo: student.rollNo,
      admissionDate: student.admissionDate
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      dispatch(updateStudent({ id: currentStudent.id, data: formData }));
    } else {
      dispatch(createStudent(formData));
    }
    
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userId') {
      setFormData({ ...formData, myUser: { id: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Filter users with STUDENT role
  const studentUsers = users.filter(u => u.role === 'STUDENT');

  if (loading && students.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Student Management</h4>
          <Button variant="primary" onClick={handleShow}>
            Add New Student
          </Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Roll No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admission Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.rollNo}</td>
                  <td>{student.myUser?.name || 'N/A'}</td>
                  <td>{student.myUser?.email || 'N/A'}</td>
                  <td>{student.admissionDate}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(student.id)}
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

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Student' : 'Add New Student'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select User</Form.Label>
              <Form.Select
                name="userId"
                value={formData.myUser.id}
                onChange={handleChange}
                required
              >
                <option value="">Choose a student user...</option>
                {studentUsers.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Roll Number</Form.Label>
              <Form.Control
                type="text"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Admission Date</Form.Label>
              <Form.Control
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {isEditing ? 'Update' : 'Create'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StudentManagement;
