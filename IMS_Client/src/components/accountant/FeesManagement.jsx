import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Form, Card, Badge } from 'react-bootstrap';
import { fetchFees, createFee, updateFee, deleteFee, recordPayment } from '../../redux/slices/feeSlice';
import { fetchStudents } from '../../redux/slices/studentSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const FeesManagement = () => {
  const dispatch = useDispatch();
  const { fees, loading } = useSelector((state) => state.fee);
  const { students } = useSelector((state) => state.student);
  
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFee, setCurrentFee] = useState(null);
  const [formData, setFormData] = useState({
    student: { id: '' },
    amount: '',
    dueDate: '',
    description: ''
  });
  const [paymentDate, setPaymentDate] = useState('');

  useEffect(() => {
    dispatch(fetchFees());
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setCurrentFee(null);
    setFormData({ student: { id: '' }, amount: '', dueDate: '', description: '' });
  };

  const handleShow = () => setShowModal(true);

  const handleEdit = (fee) => {
    setIsEditing(true);
    setCurrentFee(fee);
    setFormData({
      student: { id: fee.student?.id || '' },
      amount: fee.amount,
      dueDate: fee.dueDate,
      description: fee.description || ''
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this fee?')) {
      dispatch(deleteFee(id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      dispatch(updateFee({ id: currentFee.id, feeData: formData }));
    } else {
      dispatch(createFee(formData));
    }
    
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'studentId') {
      setFormData({ ...formData, student: { id: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRecordPayment = (fee) => {
    setCurrentFee(fee);
    setPaymentDate(new Date().toISOString().split('T')[0]);
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    dispatch(recordPayment({ id: currentFee.id, paymentDate }));
    setShowPaymentModal(false);
    setCurrentFee(null);
    setPaymentDate('');
  };

  const getStatusBadge = (status) => {
    const variants = {
      PAID: 'success',
      PENDING: 'warning',
      OVERDUE: 'danger'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  if (loading && fees.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Fees Management</h4>
          <Button variant="primary" onClick={handleShow}>
            Add New Fee
          </Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Roll No</th>
                <th>Amount (₹)</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Payment Date</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee) => (
                <tr key={fee.id}>
                  <td>{fee.id}</td>
                  <td>{fee.student?.myUser?.name || 'N/A'}</td>
                  <td>{fee.student?.rollNo || 'N/A'}</td>
                  <td>₹{fee.amount.toFixed(2)}</td>
                  <td>{fee.dueDate}</td>
                  <td>{getStatusBadge(fee.status)}</td>
                  <td>{fee.paymentDate || '-'}</td>
                  <td>{fee.description || '-'}</td>
                  <td>
                    {fee.status !== 'PAID' && (
                      <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={() => handleRecordPayment(fee)}
                      >
                        Record Payment
                      </Button>
                    )}
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(fee)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(fee.id)}
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
          <Modal.Title>{isEditing ? 'Edit Fee' : 'Add New Fee'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select Student</Form.Label>
              <Form.Select
                name="studentId"
                value={formData.student.id}
                onChange={handleChange}
                required
                disabled={isEditing}
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
              <Form.Label>Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
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

      {/* Payment Modal */}
      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Record Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePaymentSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Payment Date</Form.Label>
              <Form.Control
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setShowPaymentModal(false)} className="me-2">
                Cancel
              </Button>
              <Button variant="success" type="submit">
                Record Payment
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FeesManagement;
