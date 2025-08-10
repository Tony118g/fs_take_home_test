import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

const API_BASE = "http://localhost:8000";

function App() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    const res = await axios.get(`${API_BASE}/users`);
    setUsers(res.data);
  };

  const showTempMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const createUser = async (userData) => {
    try {
      await axios.post(`${API_BASE}/users/create`, userData);
      if (showUsers) fetchUsers();
      showTempMessage("User created successfully!");
      setShowCreateForm(false);
    } catch (error) {
      showTempMessage("Failed to create user.");
    }
  };

  useEffect(() => {
    if (showUsers) {
      fetchUsers();
    }
  }, [showUsers]);

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

  const buttonCancelStyle = {
    ...buttonStyle,
    backgroundColor: "#6c757d",
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>User Manager</h1>

      <button
        onClick={() => setShowCreateForm((prev) => !prev)}
        style={showCreateForm ? buttonCancelStyle : buttonStyle}
      >
        {showCreateForm ? "Cancel Create User" : "Create User"}
      </button>

      {showCreateForm && (
        <div style={{ textAlign: "left", maxWidth: "400px", marginBottom: "1rem" }}>
          <UserForm onSubmit={createUser} />
        </div>
      )}

      
      <button
        onClick={() => setShowUsers((prev) => !prev)}
        style={showUsers ? buttonCancelStyle : buttonStyle}
      >
        {showUsers ? "Hide Users" : "Show Users"}
      </button>
     

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

      {showUsers && (
        <UserList users={users}  />
      )}
    </div>
  );
}

export default App;
