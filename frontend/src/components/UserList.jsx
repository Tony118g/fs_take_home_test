import React from "react";

export default function UserList({ users, onDelete }) {
  if (users.length === 0) return <p>No users found.</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} style={{ marginBottom: "0.5rem" }}>
          {user.firstname} {user.lastname} ({user.age} years old) — {user.date_of_birth}
          <button onClick={() => onDelete(user.id)} style={{ marginLeft: "1rem" }}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
