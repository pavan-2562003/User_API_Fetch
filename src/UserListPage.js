import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Spinner,
  Button,
} from "react-bootstrap";
import axios from "axios";
import "./UserListPage.css"; // Import your custom CSS file
import defaultAvatar from "./Assests/avatar.png";

const API_URL = "https://602e7c2c4410730017c50b9d.mockapi.io/users";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        // Replace avatars with the default one if the URL contains a specific string
        const modifiedUsers = response.data.map((user) => {
          if (
            user.avatar &&
            user.avatar.includes("cdn.fakercloud.com/avatars")
          ) {
            return { ...user, avatar: defaultAvatar };
          }
          return user;
        });

        setUsers(modifiedUsers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleClearUserDetails = () => {
    setSelectedUser(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Container className={`user-list-page mt-4 ${darkMode ? "dark-mode" : ""}`}>
      {loading && <div className="preloader"></div>}
      <Row>
        <Col md={12} className="user-list-details">
          <div className="user-list">
            <h4 className={`mb-3 ${darkMode ? "dark-text" : ""}`}>
              Users List
            </h4>
            {loading ? (
              <Spinner animation="border" variant="primary" size="sm" />
            ) : users.length === 0 ? (
              <p>No data to show</p>
            ) : (
              <ListGroup flush>
                {users.map((user) => (
                  <ListGroup.Item
                    key={user.id}
                    action
                    onClick={() => handleUserClick(user)}
                    className="user-list-item"
                  >
                    <img
                      src={user.avatar || defaultAvatar}
                      alt={user.name}
                      className="avatar mr-3"
                      width="50"
                      height="50"
                    />
                    <span
                      className={`user-details-title ${
                        darkMode ? "dark-text" : ""
                      }`}
                    >
                      {user.name}
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
          <div className="user-details">
          <Button
                className={`dark-mode-toggle-btn ${
                  darkMode ? "dark-text" : ""
                }`}
                variant="secondary"
                onClick={toggleDarkMode}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </Button>
            <div className="user-details-header">
              <h4 className={`mb-3 ${darkMode ? "dark-text" : ""}`}>
                User Details
              </h4>
              
            </div>
            {selectedUser ? (
              <Card>
                <Card.Body>
                  <Card.Title>{selectedUser.name}</Card.Title>
                  <Card.Text>
                    <strong>Email:</strong>{" "}
                    {selectedUser.profile.email || "N/A"}
                    <br />
                    <strong>Job Title:</strong> {selectedUser.jobTitle || "N/A"}
                    <br />
                    <strong>Bio:</strong> {selectedUser.Bio || "N/A"}
                    <br />
                    <strong>Profile:</strong>{" "}
                    {selectedUser.profile.username || "N/A"}
                    <br />
                    <strong>First Name:</strong>{" "}
                    {selectedUser.profile.firstName || "N/A"}
                    <br />
                    <strong>Last Name:</strong>{" "}
                    {selectedUser.profile.lastName || "N/A"}
                    <br />
                  </Card.Text>
                </Card.Body>
              </Card>
            ) : (
              <p className={`mt-3 ${darkMode ? "dark-text" : ""}`}>
                Select a user to view details
              </p>
            )}
            <div className="dark-mode-toggle mt-3">
              <Button
                className={`dark-mode-toggle-btn ${
                  darkMode ? "dark-text" : ""
                }`}
                variant="secondary"
                onClick={handleClearUserDetails}
              >
                Clear User Details
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserListPage;
