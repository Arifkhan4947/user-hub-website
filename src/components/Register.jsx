import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.find(u => u.email === formData.email)) {
      alert('Email already exists');
      return;
    }

    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/login');
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: '400px' }}>
      <Card.Body>
        <Card.Title className="text-center mb-4">Register</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Register
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Register; 