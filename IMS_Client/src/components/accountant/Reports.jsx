import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Row, Col, Table, Form } from 'react-bootstrap';
import { fetchFees } from '../../redux/slices/feeSlice';
import { fetchStudents } from '../../redux/slices/studentSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const Reports = () => {
  const dispatch = useDispatch();
  const { fees, loading: feesLoading } = useSelector((state) => state.fee);
  const { students, loading: studentsLoading } = useSelector((state) => state.student);
  
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    dispatch(fetchFees());
    dispatch(fetchStudents());
  }, [dispatch]);

  // Fee Collection Summary
  const getFeeCollectionSummary = () => {
    const total = fees.reduce((sum, fee) => sum + fee.amount, 0);
    const collected = fees
      .filter(fee => fee.status === 'PAID')
      .reduce((sum, fee) => sum + fee.amount, 0);
    const pending = fees
      .filter(fee => fee.status === 'PENDING')
      .reduce((sum, fee) => sum + fee.amount, 0);
    const overdue = fees
      .filter(fee => fee.status === 'OVERDUE')
      .reduce((sum, fee) => sum + fee.amount, 0);

    return { total, collected, pending, overdue };
  };

  // Student Payment Status
  const getStudentPaymentStatus = () => {
    const studentMap = new Map();
    
    students.forEach(student => {
      studentMap.set(student.id, {
        name: student.myUser?.name || 'N/A',
        rollNo: student.rollNo,
        totalFees: 0,
        paidFees: 0,
        pendingFees: 0,
        overdueFees: 0
      });
    });

    fees.forEach(fee => {
      const studentData = studentMap.get(fee.student?.id);
      if (studentData) {
        studentData.totalFees += fee.amount;
        if (fee.status === 'PAID') {
          studentData.paidFees += fee.amount;
        } else if (fee.status === 'PENDING') {
          studentData.pendingFees += fee.amount;
        } else if (fee.status === 'OVERDUE') {
          studentData.overdueFees += fee.amount;
        }
      }
    });

    return Array.from(studentMap.values());
  };

  const summary = getFeeCollectionSummary();
  const studentPaymentStatus = getStudentPaymentStatus();

  if (feesLoading || studentsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h2 className="mb-4">Reports</h2>

      {/* Fee Collection Summary */}
      <Card className="mb-4">
        <Card.Header>
          <h4 className="mb-0">Fee Collection Summary</h4>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={3}>
              <Card className="text-center bg-primary text-white">
                <Card.Body>
                  <h5>Total Fees</h5>
                  <h3>₹{summary.total.toFixed(2)}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center bg-success text-white">
                <Card.Body>
                  <h5>Collected</h5>
                  <h3>₹{summary.collected.toFixed(2)}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center bg-warning text-white">
                <Card.Body>
                  <h5>Pending</h5>
                  <h3>₹{summary.pending.toFixed(2)}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center bg-danger text-white">
                <Card.Body>
                  <h5>Overdue</h5>
                  <h3>₹{summary.overdue.toFixed(2)}</h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Student Payment Status */}
      <Card className="mb-4">
        <Card.Header>
          <h4 className="mb-0">Student Payment Status</h4>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Total Fees (₹)</th>
                <th>Paid (₹)</th>
                <th>Pending (₹)</th>
                <th>Overdue (₹)</th>
                <th>Payment %</th>
              </tr>
            </thead>
            <tbody>
              {studentPaymentStatus.map((student, index) => {
                const paymentPercentage = student.totalFees > 0 
                  ? ((student.paidFees / student.totalFees) * 100).toFixed(2)
                  : 0;
                
                return (
                  <tr key={index}>
                    <td>{student.rollNo}</td>
                    <td>{student.name}</td>
                    <td>₹{student.totalFees.toFixed(2)}</td>
                    <td className="text-success">₹{student.paidFees.toFixed(2)}</td>
                    <td className="text-warning">₹{student.pendingFees.toFixed(2)}</td>
                    <td className="text-danger">₹{student.overdueFees.toFixed(2)}</td>
                    <td>
                      <strong>{paymentPercentage}%</strong>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Fee Status Breakdown */}
      <Card>
        <Card.Header>
          <h4 className="mb-0">Fee Status Breakdown</h4>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Status</th>
                <th>Count</th>
                <th>Total Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-success">
                <td>Paid</td>
                <td>{fees.filter(f => f.status === 'PAID').length}</td>
                <td>₹{summary.collected.toFixed(2)}</td>
              </tr>
              <tr className="table-warning">
                <td>Pending</td>
                <td>{fees.filter(f => f.status === 'PENDING').length}</td>
                <td>₹{summary.pending.toFixed(2)}</td>
              </tr>
              <tr className="table-danger">
                <td>Overdue</td>
                <td>{fees.filter(f => f.status === 'OVERDUE').length}</td>
                <td>₹{summary.overdue.toFixed(2)}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Reports;
