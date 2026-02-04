import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table, Badge } from 'react-bootstrap';
import { fetchResults } from '../../redux/slices/resultSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const MyResults = () => {
  const dispatch = useDispatch();
  const { results, loading } = useSelector((state) => state.result);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchResults());
  }, [dispatch]);

  // Filter results for current student
  const myResults = results.filter(r => r.myStudent?.myUser?.email === user?.email);

  if (loading) {
    return <LoadingSpinner />;
  }

  const getGradeBadge = (grade) => {
    const gradeColors = {
      'A+': 'success',
      'A': 'success',
      'B+': 'primary',
      'B': 'primary',
      'C': 'warning',
      'D': 'warning',
      'F': 'danger'
    };
    return gradeColors[grade] || 'secondary';
  };

  return (
    <div>
      <Card>
        <Card.Header>
          <h4 className="mb-0">My Results</h4>
        </Card.Header>
        <Card.Body>
          {myResults.length === 0 ? (
            <p className="text-muted">No results available yet.</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Exam</th>
                  <th>Course</th>
                  <th>Marks</th>
                  <th>Grade</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {myResults.map((result) => (
                  <tr key={result.id}>
                    <td>{result.myExam?.examType || 'N/A'}</td>
                    <td>{result.myExam?.myCourse?.courseName || 'N/A'}</td>
                    <td>{result.marks}</td>
                    <td>
                      <Badge bg={getGradeBadge(result.grade)}>{result.grade}</Badge>
                    </td>
                    <td>{result.myExam?.examDate || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyResults;
