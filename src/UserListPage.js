// UserListPage.js

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import './UserListPage.css'; // Import your custom CSS file

const API_URL = 'https://602e7c2c4410730017c50b9d.mockapi.io/users';
const DUMMY_PROFILE_IMAGE = 'https://via.placeholder.com/50'; // Placeholder image URL

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <Container className="user-list-page mt-4">
      {loading && <div className="preloader"></div>}
      <Row>
        <Col md={6} className="user-list">
          <h4 className="mb-3">Users List</h4>
          {loading ? (
            <Spinner animation="border" variant="primary" size="sm" />
          ) : users.length === 0 ? (
            <p>No data to show</p>
          ) : (
            <ListGroup flush>
              {users.map(user => (
                <ListGroup.Item
                  key={user.id}
                  action
                  onClick={() => handleUserClick(user)}
                  className="user-list-item"
                >
                  <img
                    src={user.avatar || DUMMY_PROFILE_IMAGE}
                    alt={user.name}
                    className="avatar mr-3"
                    width="50"
                    height="50"
                  />
                  {user.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={6} className="user-details">
          <h4 className="mb-3">User Details</h4>
          {selectedUser ? (
            <Card>
              <Card.Body>
                <Card.Title>{selectedUser.name}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {selectedUser.profile.email || 'N/A'}<br />
                  <strong>Job Title:</strong> {selectedUser.jobTitle || 'N/A'}<br />
                  <strong>Bio:</strong> {selectedUser.Bio || 'N/A'}<br />
                  <strong>Profile:</strong> {selectedUser.profile.username || 'N/A'}<br />
                  <strong>First Name:</strong> {selectedUser.profile.firstName || 'N/A'}<br />
                  <strong>Last Name:</strong> {selectedUser.profile.lastName || 'N/A'}<br />
                </Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <p className="mt-3">Select a user to view details</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserListPage;
