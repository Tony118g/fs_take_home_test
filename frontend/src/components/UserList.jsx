// components/UserList.jsx
import React from "react";

function UserList({ users }) {
  if (users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={cellStyle}>First Name</th>
          <th style={cellStyle}>Last Name</th>
          <th style={cellStyle}>Date of Birth</th>
          <th style={cellStyle}>Age</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td style={cellStyle}>{user.firstname}</td>
            <td style={cellStyle}>{user.lastname}</td>
            <td style={cellStyle}>{user.date_of_birth}</td>
            <td style={cellStyle}>{user.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const cellStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "left",
};

export default UserList;
