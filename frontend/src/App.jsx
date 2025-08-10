import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

const API_BASE = "http://localhost:8000";

function App() {
  // State to hold user list from API
  const [users, setUsers] = useState([]);

  // Toggle whether to show the user list
  const [showUsers, setShowUsers] = useState(false);

  // Toggle whether to show the create user form
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Message shown temporarily for success/error feedback
  const [message, setMessage] = useState("");

  // Fetch all users from API and update state
  const fetchUsers = async () => {
    const res = await axios.get(`${API_BASE}/users`);
    setUsers(res.data);
  };

  // Show a temporary message for 3 seconds
  const showTempMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  // Create a new user via API and refresh list if visible
  const createUser = async (userData) => {
    try {
      await axios.post(`${API_BASE}/users/create`, userData);
      if (showUsers) fetchUsers(); // Refresh user list if shown
      showTempMessage("User created successfully!");
      setShowCreateForm(false); // Hide create form after success
    } catch (error) {
      showTempMessage("Failed to create user.");
    }
  };

  // Update existing user via API and refresh list if visible
  const updateUser = async (id, userData) => {
    try {
      await axios.put(`${API_BASE}/users/${id}`, userData);
      if (showUsers) fetchUsers();
      showTempMessage("User updated successfully!");
    } catch (error) {
      showTempMessage("Failed to update user.");
    }
  };

  // Delete a user via API and refresh the list
  const deleteUser = async (id) => {
    try {
      // Note: delete endpoint expects user_id param
      await axios.delete(`${API_BASE}/user`, { params: { user_id: id } });
      fetchUsers();
      showTempMessage("User deleted successfully!");
    } catch (error) {
      showTempMessage("Failed to delete user.");
    }
  };

  // Fetch users from API when 'showUsers' toggles to true
  useEffect(() => {
    if (showUsers) {
      fetchUsers();
    }
  }, [showUsers]);

  // Basic button style object
  const buttonStyle = {
    padding: "0.5rem 1rem",
    marginRight: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  // Cancel button style based on base buttonStyle
  const buttonCancelStyle = {
    ...buttonStyle,
    backgroundColor: "#6c757d",
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>User Manager</h1>

      {/* Button to toggle showing the create user form */}
      <button
        onClick={() => setShowCreateForm((prev) => !prev)}
        style={showCreateForm ? buttonCancelStyle : buttonStyle}
      >
        {showCreateForm ? "Cancel user creation" : "Create User"}
      </button>

      {/* Show the create user form if toggled */}
      {showCreateForm && (
        <div style={{ textAlign: "left", maxWidth: "400px", marginBottom: "1rem" }}>
          <UserForm onSubmit={createUser} />
        </div>
      )}

      {/* Button to toggle showing the user list */}
      <button
        onClick={() => setShowUsers((prev) => !prev)}
        style={showUsers ? buttonCancelStyle : buttonStyle}
      >
        {showUsers ? "Hide Users" : "Show Users"}
      </button>

      {/* Show temporary messages for user feedback */}
      {message && (
        <div
          style={{
            backgroundColor: "#D4EDDA",
            color: "#155724",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "5px",
          }}
        >
          {message}
        </div>
      )}

      {/* Show user list if toggled on, pass handlers for delete and update */}
      {showUsers && (
        <UserList users={users} onDelete={deleteUser} onUpdate={updateUser} />
      )}
    </div>
  );
}

export default App;
