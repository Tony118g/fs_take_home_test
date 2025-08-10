import React, { useState, useEffect } from "react";

export default function UserForm({ onSubmit, editingUser, onCancel }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [letterError, setLetterError] = useState({ firstname: "", lastname: "" });
  const [touched, setTouched] = useState({ firstname: false, lastname: false, dateOfBirth: false });

  useEffect(() => {
    if (editingUser) {
      setFirstname(editingUser.firstname);
      setLastname(editingUser.lastname);
      setDateOfBirth(editingUser.date_of_birth);
      setLetterError({ firstname: "", lastname: "" });
      setTouched({ firstname: false, lastname: false, dateOfBirth: false });
    }
  }, [editingUser]);

  const filterLettersOnly = (value) => {
    return value.replace(/[^a-zA-Z]/g, "");
  };

  const capitalizeName = (name) => {
    return name
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleFirstnameChange = (e) => {
    const raw = e.target.value;
    const filtered = filterLettersOnly(raw);
    setFirstname(raw);
    setLetterError((prev) => ({
      ...prev,
      firstname: raw === filtered ? "" : "Only letters allowed.",
    }));
  };

  const handleLastnameChange = (e) => {
    const raw = e.target.value;
    const filtered = filterLettersOnly(raw);
    setLastname(raw);
    setLetterError((prev) => ({
      ...prev,
      lastname: raw === filtered ? "" : "Only letters allowed.",
    }));
  };

  const handleDateChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validate = () => {
    return (
      firstname.trim() !== "" &&
      lastname.trim() !== "" &&
      dateOfBirth !== "" &&
      !letterError.firstname &&
      !letterError.lastname
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ firstname: true, lastname: true, dateOfBirth: true });

    if (!validate()) return;

    onSubmit({
      firstname: capitalizeName(firstname.trim()),
      lastname: capitalizeName(lastname.trim()),
      date_of_birth: dateOfBirth,
    });

    if (!editingUser) {
      setFirstname("");
      setLastname("");
      setDateOfBirth("");
      setLetterError({ firstname: "", lastname: "" });
      setTouched({ firstname: false, lastname: false, dateOfBirth: false });
    }
  };

  const formStyle = {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "1.5rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.3rem",
    fontWeight: "600",
    color: "#333",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
  };

  const errorStyle = {
    color: "red",
    fontSize: "0.8rem",
    marginBottom: "0.5rem",
  };

  const buttonStyle = {
    padding: "0.6rem 1.2rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
    marginRight: "1rem",
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div>
        <label style={labelStyle}>First Name:</label>
        <input
          type="text"
          value={firstname}
          onChange={handleFirstnameChange}
          maxLength={50}
          required
          onBlur={() => handleBlur("firstname")}
          pattern="[A-Za-z]+"
          title="Only letters allowed."
          style={inputStyle}
        />
        {touched.firstname && firstname.trim() === "" && (
          <div style={errorStyle}>This field is required.</div>
        )}
        {letterError.firstname && (
          <div style={errorStyle}>{letterError.firstname}</div>
        )}
      </div>

      <div>
        <label style={labelStyle}>Last Name:</label>
        <input
          type="text"
          value={lastname}
          onChange={handleLastnameChange}
          maxLength={50}
          required
          onBlur={() => handleBlur("lastname")}
          pattern="[A-Za-z]+"
          title="Only letters allowed."
          style={inputStyle}
        />
        {touched.lastname && lastname.trim() === "" && (
          <div style={errorStyle}>This field is required.</div>
        )}
        {letterError.lastname && (
          <div style={errorStyle}>{letterError.lastname}</div>
        )}
      </div>

      <div>
        <label style={labelStyle}>Date of Birth:</label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={handleDateChange}
          max={new Date().toISOString().split("T")[0]}
          required
          onBlur={() => handleBlur("dateOfBirth")}
          style={inputStyle}
        />
        {touched.dateOfBirth && dateOfBirth === "" && (
          <div style={errorStyle}>This field is required.</div>
        )}
      </div>

      <button type="submit" style={buttonStyle}>
        {editingUser ? "Save Changes" : "Create User"}
      </button>

      {editingUser && (
        <button
          type="button"
          onClick={onCancel}
          style={cancelButtonStyle}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
