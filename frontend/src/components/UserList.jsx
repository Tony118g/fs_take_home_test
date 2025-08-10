import React, { useState } from "react";

export default function UserList({ users, onDelete, onUpdate }) {
  // Track which user is currently being edited (by id)
  const [editingUserId, setEditingUserId] = useState(null);

  // Form state used for editing a user
  const [editForm, setEditForm] = useState({
    firstname: "",
    lastname: "",
    date_of_birth: "",
  });

  // Validation error messages for each field during edit
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    date_of_birth: "",
  });

  // Track which fields have been touched (to show errors only after blur)
  const [touched, setTouched] = useState({
    firstname: false,
    lastname: false,
    date_of_birth: false,
  });

  // Utility: Filter input to only letters (used for name validation)
  const filterLettersOnly = (value) => {
    return value.replace(/[^a-zA-Z]/g, "");
  };

  const maxLength = 50;

  // Validate the entire edit form before saving
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

  // When clicking 'Edit', populate the form with the selected user's data
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

  // Handle changes in the edit form inputs, including validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    let newErrors = { ...errors };

    if (name === "firstname" || name === "lastname") {
      // Check for non-letter characters and max length
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
      // Date of birth cannot be in the future
      if (new Date(value) > new Date()) {
        newErrors.date_of_birth = "Date of birth cannot be in the future.";
      } else {
        newErrors.date_of_birth = "";
      }
    }

    // Update form values and error states
    setEditForm({
      ...editForm,
      [name]: newValue,
    });
    setErrors(newErrors);
  };

  // Mark a field as touched on blur to trigger validation message display
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Save changes and call parent's onUpdate prop if valid
  const handleSaveClick = () => {
    setTouched({ firstname: true, lastname: true, date_of_birth: true });
    if (!validate()) return;
    onUpdate(editingUserId, editForm);
    setEditingUserId(null); // Exit edit mode
  };

  // Cancel editing without saving changes
  const handleCancelClick = () => {
    setEditingUserId(null);
  };

  // Show message if no users
  if (users.length === 0) return <p>No users found.</p>;

  // Inline styles for inputs and error messages
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
              {/* Editable input fields */}
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
                {/* Validation error message */}
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

              {/* Save and Cancel buttons */}
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
              {/* Display user info when not editing */}
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
