import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Form, Button, Table, Row, Col } from 'react-bootstrap';
import { fetchStudents } from '../../redux/slices/studentSlice';
import { fetchExams } from '../../redux/slices/examSlice';
import { createResult, fetchResults } from '../../redux/slices/resultSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const EnterResults = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.student);
  const { exams } = useSelector((state) => state.exam);
  const { loading } = useSelector((state) => state.result);

  const [selectedExam, setSelectedExam] = useState('');
  const [resultRecords, setResultRecords] = useState({});

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchExams());
    dispatch(fetchResults());
  }, [dispatch]);

  const handleResultChange = (studentId, field, value) => {
    setResultRecords({
      ...resultRecords,
      [studentId]: {
        ...resultRecords[studentId],
        [field]: value
      }
    });
  };

  const calculateGrade = (marks) => {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B+';
    if (marks >= 60) return 'B';
    if (marks >= 50) return 'C';
    if (marks >= 40) return 'D';
    return 'F';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedExam) {
      alert('Please select an exam');
      return;
    }

    // Submit results for each student
    Object.entries(resultRecords).forEach(([studentId, record]) => {
      if (record.marks !== undefined) {
        const grade = calculateGrade(parseInt(record.marks));
        const resultData = {
          myStudent: { id: parseInt(studentId) },
          myExam: { id: parseInt(selectedExam) },
          marks: parseInt(record.marks),
          grade: grade
        };
        dispatch(createResult(resultData));
      }
    });

    // Reset form
    setResultRecords({});
    alert('Results entered successfully!');
  };

  if (loading && students.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Card>
        <Card.Header>
          <h4 className="mb-0">Enter Results</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Select Exam</Form.Label>
                  <Form.Select value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)} required>
                    <option value="">Choose an exam...</option>
                    {exams.map(exam => (
                      <option key={exam.id} value={exam.id}>
                        {exam.myCourse?.courseName} - {exam.examType} ({exam.examDate})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {selectedExam && (
              <>
                <Table striped bordered hover responsive className="mt-3">
                  <thead>
                    <tr>
                      <th>Roll No</th>
                      <th>Student Name</th>
                      <th>Marks (out of 100)</th>
                      <th>Grade (Auto)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td>{student.rollNo}</td>
                        <td>{student.myUser?.name || 'N/A'}</td>
                        <td>
                          <Form.Control
                            type="number"
                            min="0"
                            max="100"
                            value={resultRecords[student.id]?.marks || ''}
                            onChange={(e) => handleResultChange(student.id, 'marks', e.target.value)}
                            placeholder="Enter marks"
                          />
                        </td>
                        <td>
                          {resultRecords[student.id]?.marks ? 
                            calculateGrade(parseInt(resultRecords[student.id].marks)) : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="d-flex justify-content-end">
                  <Button variant="primary" type="submit">Submit Results</Button>
                </div>
              </>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EnterResults;
