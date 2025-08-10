import React, { useState } from "react";

export default function UserList({ users, onDelete, onUpdate }) {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({
    firstname: "",
    lastname: "",
    date_of_birth: "",
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    date_of_birth: "",
  });
  const [touched, setTouched] = useState({
    firstname: false,
    lastname: false,
    date_of_birth: false,
  });

  const filterLettersOnly = (value) => {
    return value.replace(/[^a-zA-Z]/g, "");
  };

  const maxLength = 50;

  const validate = () => {
    return (
      editForm.firstname.trim() !== "" &&
      editForm.lastname.trim() !== "" &&
      editForm.date_of_birth !== "" &&
      !errors.firstname &&
      !errors.lastname &&
      !errors.date_of_birth
    );
  };

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditForm({
      firstname: user.firstname,
      lastname: user.lastname,
      date_of_birth: user.date_of_birth,
    });
    setErrors({ firstname: "", lastname: "", date_of_birth: "" });
    setTouched({ firstname: false, lastname: false, date_of_birth: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    let newErrors = { ...errors };

    if (name === "firstname" || name === "lastname") {
      // Filter letters only but keep user's raw input for UX
      const filtered = filterLettersOnly(value);
      if (value !== filtered) {
        newErrors[name] = "Only letters allowed.";
      } else {
        newErrors[name] = "";
      }
      if (value.length > maxLength) {
        newErrors[name] = `Maximum length is ${maxLength} characters.`;
      }
    }

    if (name === "date_of_birth") {
      if (new Date(value) > new Date()) {
        newErrors.date_of_birth = "Date of birth cannot be in the future.";
      } else {
        newErrors.date_of_birth = "";
      }
    }

    setEditForm({
      ...editForm,
      [name]: newValue,
    });
    setErrors(newErrors);
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSaveClick = () => {
    setTouched({ firstname: true, lastname: true, date_of_birth: true });
    if (!validate()) return;
    onUpdate(editingUserId, editForm);
    setEditingUserId(null);
  };

  const handleCancelClick = () => {
    setEditingUserId(null);
  };

  if (users.length === 0) return <p>No users found.</p>;

  const inputStyle = {
    marginRight: "0.5rem",
    padding: "0.25rem",
    fontSize: "1rem",
  };

  const errorStyle = {
    color: "red",
    fontSize: "0.75rem",
    marginTop: "0.2rem",
    marginBottom: "0.3rem",
  };

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} style={{ marginBottom: "0.75rem" }}>
          {editingUserId === user.id ? (
            <>
              <div style={{ display: "inline-block", verticalAlign: "top" }}>
                <input
                  type="text"
                  name="firstname"
                  value={editForm.firstname}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("firstname")}
                  placeholder="First Name"
                  maxLength={maxLength}
                  style={inputStyle}
                />
                {touched.firstname && errors.firstname && (
                  <div style={errorStyle}>{errors.firstname}</div>
                )}
              </div>

              <div style={{ display: "inline-block", verticalAlign: "top" }}>
                <input
                  type="text"
                  name="lastname"
                  value={editForm.lastname}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("lastname")}
                  placeholder="Last Name"
                  maxLength={maxLength}
                  style={inputStyle}
                />
                {touched.lastname && errors.lastname && (
                  <div style={errorStyle}>{errors.lastname}</div>
                )}
              </div>

              <div style={{ display: "inline-block", verticalAlign: "top" }}>
                <input
                  type="date"
                  name="date_of_birth"
                  value={editForm.date_of_birth}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("date_of_birth")}
                  max={new Date().toISOString().split("T")[0]}
                  style={inputStyle}
                />
                {touched.date_of_birth && errors.date_of_birth && (
                  <div style={errorStyle}>{errors.date_of_birth}</div>
                )}
              </div>

              <button
                onClick={handleSaveClick}
                style={{ marginLeft: "0.5rem" }}
                disabled={!validate()}
              >
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
