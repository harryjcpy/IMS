import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { login } from '../../redux/slices/authSlice';
import { ROUTES } from '../../utils/constants';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await dispatch(login({ email, password }));
    
    
    if (login.fulfilled.match(result)) {
      const role = result.payload.role;
      
      // Redirect based on role
      switch (role) {
        case 'ADMIN':
          navigate(ROUTES.ADMIN_DASHBOARD);
          break;
        case 'STUDENT':
          navigate(ROUTES.STUDENT_DASHBOARD);
          break;
        case 'TEACHER':
          navigate(ROUTES.TEACHER_DASHBOARD);
          break;
        case 'ACCOUNTANT':
          navigate(ROUTES.ACCOUNTANT_DASHBOARD);
          break;
        default:
          navigate('/');
      }
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={6} lg={4}>
          <Card className="shadow">
            <Card.Body className="p-5">
              <h2 className="text-center mb-4">IMS Login</h2>
              <p className="text-center text-muted mb-4">Institute Management System</p>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
