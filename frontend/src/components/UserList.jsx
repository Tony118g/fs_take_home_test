import React, { useState } from "react";

export default function UserList({ users, onDelete, onUpdate }) {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({
    firstname: "",
    lastname: "",
    date_of_birth: "",
  });

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditForm({
      firstname: user.firstname,
      lastname: user.lastname,
      date_of_birth: user.date_of_birth,
    });
  };

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveClick = () => {
    onUpdate(editingUserId, editForm);
    setEditingUserId(null);
  };

  const handleCancelClick = () => {
    setEditingUserId(null);
  };

  if (users.length === 0) return <p>No users found.</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} style={{ marginBottom: "0.5rem" }}>
          {editingUserId === user.id ? (
            <>
              <input
                type="text"
                name="firstname"
                value={editForm.firstname}
                onChange={handleInputChange}
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastname"
                value={editForm.lastname}
                onChange={handleInputChange}
                placeholder="Last Name"
              />
              <input
                type="date"
                name="date_of_birth"
                value={editForm.date_of_birth}
                onChange={handleInputChange}
              />
              <button onClick={handleSaveClick} style={{ marginLeft: "0.5rem" }}>
                Save
              </button>
              <button onClick={handleCancelClick} style={{ marginLeft: "0.5rem" }}>
                Cancel
              </button>
            </>
          ) : (
            <>
              {user.firstname} {user.lastname} ({user.age} years old) — {user.date_of_birth}
              <button onClick={() => onDelete(user.id)} style={{ marginLeft: "1rem" }}>
                Delete
              </button>
              <button onClick={() => handleEditClick(user)} style={{ marginLeft: "0.5rem" }}>
                Edit
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
