import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Form, Card } from 'react-bootstrap';
import { fetchTeachers, createTeacher, updateTeacher, deleteTeacher } from '../../redux/slices/teacherSlice';
import { fetchUsers } from '../../redux/slices/userSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const TeacherManagement = () => {
  const dispatch = useDispatch();
  const { teachers, loading } = useSelector((state) => state.teacher);
  const { users } = useSelector((state) => state.user);
  
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [formData, setFormData] = useState({
    myUser: { id: '' },
    qualification: '',
    experienceYears: 0
  });

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentTeacher(null);
    setFormData({ myUser: { id: '' }, qualification: '', experienceYears: 0 });
  };

  const handleShow = () => setShowModal(true);

  const handleEdit = (teacher) => {
    setIsEditing(true);
    setCurrentTeacher(teacher);
    setFormData({
      myUser: { id: teacher.myUser?.id || '' },
      qualification: teacher.qualification,
      experienceYears: teacher.experienceYears
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      dispatch(deleteTeacher(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateTeacher({ id: currentTeacher.id, data: formData }));
    } else {
      dispatch(createTeacher(formData));
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

  const teacherUsers = users.filter(u => u.role === 'TEACHER');

  if (loading && teachers.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Teacher Management</h4>
          <Button variant="primary" onClick={handleShow}>Add New Teacher</Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Qualification</th>
                <th>Experience (Years)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{teacher.id}</td>
                  <td>{teacher.myUser?.name || 'N/A'}</td>
                  <td>{teacher.myUser?.email || 'N/A'}</td>
                  <td>{teacher.qualification}</td>
                  <td>{teacher.experienceYears}</td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(teacher)}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(teacher.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Teacher' : 'Add New Teacher'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select User</Form.Label>
              <Form.Select name="userId" value={formData.myUser.id} onChange={handleChange} required>
                <option value="">Choose a teacher user...</option>
                {teacherUsers.map(user => (
                  <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Qualification</Form.Label>
              <Form.Control type="text" name="qualification" value={formData.qualification} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Experience (Years)</Form.Label>
              <Form.Control type="number" name="experienceYears" value={formData.experienceYears} onChange={handleChange} required min="0" />
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

export default TeacherManagement;
