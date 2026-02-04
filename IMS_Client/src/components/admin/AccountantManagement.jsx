import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Form, Card } from 'react-bootstrap';
import { fetchAccountants, createAccountant, updateAccountant, deleteAccountant } from '../../redux/slices/accountantSlice';
import { fetchUsers } from '../../redux/slices/userSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const AccountantManagement = () => {
  const dispatch = useDispatch();
  const { accountants, loading } = useSelector((state) => state.accountant);
  const { users } = useSelector((state) => state.user);
  
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAccountant, setCurrentAccountant] = useState(null);
  const [formData, setFormData] = useState({
    myUser: { id: '' }
  });

  useEffect(() => {
    dispatch(fetchAccountants());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentAccountant(null);
    setFormData({ myUser: { id: '' } });
  };

  const handleShow = () => setShowModal(true);

  const handleEdit = (accountant) => {
    setIsEditing(true);
    setCurrentAccountant(accountant);
    setFormData({
      myUser: { id: accountant.myUser?.id || '' }
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this accountant?')) {
      dispatch(deleteAccountant(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateAccountant({ id: currentAccountant.id, data: formData }));
    } else {
      dispatch(createAccountant(formData));
    }
    handleClose();
  };

  const handleChange = (e) => {
    setFormData({ myUser: { id: e.target.value } });
  };

  const accountantUsers = users.filter(u => u.role === 'ACCOUNTANT');

  if (loading && accountants.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Accountant Management</h4>
          <Button variant="primary" onClick={handleShow}>Add New Accountant</Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accountants.map((accountant) => (
                <tr key={accountant.id}>
                  <td>{accountant.id}</td>
                  <td>{accountant.myUser?.name || 'N/A'}</td>
                  <td>{accountant.myUser?.email || 'N/A'}</td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(accountant)}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(accountant.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Accountant' : 'Add New Accountant'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select User</Form.Label>
              <Form.Select name="userId" value={formData.myUser.id} onChange={handleChange} required>
                <option value="">Choose an accountant user...</option>
                {accountantUsers.map(user => (
                  <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
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

export default AccountantManagement;
