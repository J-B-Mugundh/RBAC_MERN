import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CaseForm = ({ user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && user === null) {
      toast.error("Please log in to view cases.");
      navigate("/");
      return;
    }
  }, [user, navigate]);

  const [data, setData] = useState({
    caseId: "",
    dateTimeOfIncident: "",
    location: "",
    victimName: "",
    suspectName: "",
    descriptionOfIncident: "",
    charges: "",
    arrestInformation: "",
    evidence: "",
  });
  const [cases, setCases] = useState([]);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [currentCaseId, setCurrentCaseId] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/cases";
      const token = localStorage.getItem("token");
      const headers = { "x-auth-token": token };

      if (editing) {
        await axios.put(`${url}/${currentCaseId}`, data, { headers });
        setCases((prevCases) =>
          prevCases.map((c) => (c._id === currentCaseId ? data : c))
        );
        toast.success("Case updated successfully");
      } else {
        await axios.post(url, data, { headers });
        setCases([...cases, data]);
        toast.success("Case created successfully");
      }
      setEditing(false);
      setData({
        caseId: "",
        dateTimeOfIncident: "",
        location: "",
        victimName: "",
        suspectName: "",
        descriptionOfIncident: "",
        charges: "",
        arrestInformation: "",
        evidence: "",
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleEdit = (caseItem) => {
    setEditing(true);
    setCurrentCaseId(caseItem._id);
    setData(caseItem);
  };

  const handleDelete = async (id) => {
    try {
      const url = `http://localhost:8080/api/cases/${id}`;
      const token = localStorage.getItem("token");
      await axios.delete(url, { headers: { "x-auth-token": token } });
      setCases(cases.filter((c) => c._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        {editing ? "Edit Case" : "Create Case"}
      </h1>
      {user && // Add a conditional check to ensure user exists
        user.role === 1 && (
          <p className={styles.info}>
            Admins can only view cases. Super Admins can edit and delete cases.
          </p>
        )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Case Id"
          name="caseId"
          onChange={handleChange}
          value={data.caseId}
          required
          className={styles.input}
        />
        <input
          type="datetime-local"
          name="dateTimeOfIncident"
          onChange={handleChange}
          value={data.dateTimeOfIncident}
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          onChange={handleChange}
          value={data.location}
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Victim Name"
          name="victimName"
          onChange={handleChange}
          value={data.victimName}
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Suspect Name"
          name="suspectName"
          onChange={handleChange}
          value={data.suspectName}
          required
          className={styles.input}
        />
        <textarea
          placeholder="Description of Incident"
          name="descriptionOfIncident"
          onChange={handleChange}
          value={data.descriptionOfIncident}
          required
          className={styles.textarea}
        />
        <input
          type="text"
          placeholder="Charges"
          name="charges"
          onChange={handleChange}
          value={data.charges}
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Arrest Information"
          name="arrestInformation"
          onChange={handleChange}
          value={data.arrestInformation}
          required
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Evidence"
          name="evidence"
          onChange={handleChange}
          value={data.evidence}
          required
          className={styles.input}
        />
        {error && <div className={styles.error}>{error}</div>}
        {user && (user.role === 0 || user.role === 1) ? (
          <button type="submit" className={styles.submit}>
            {editing ? "Update Case" : "Create Case"}
          </button>
        ) : null}
      </form>
      <ToastContainer />
    </div>
  );
};

export default CaseForm;
