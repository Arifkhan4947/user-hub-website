import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setFormData(user);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u => 
      u.email === formData.email ? formData : u
    );
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('user', JSON.stringify(formData));
    setIsEditing(false);
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: '400px' }}>
      <Card.Body>
        <Card.Title className="text-center mb-4">Profile</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              disabled={!isEditing}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              disabled={!isEditing}
            />
          </Form.Group>
          {isEditing ? (
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button variant="primary" onClick={() => setIsEditing(true)} className="w-100">
              Edit Profile
            </Button>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Profile; 