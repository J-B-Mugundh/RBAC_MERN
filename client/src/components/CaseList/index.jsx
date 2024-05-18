import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./styles.css";

const CaseTable = ({ user }) => {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);

  useEffect(() => {
    if (!user) {
      toast.error("Please log in to view cases.");
      navigate("/");
      return;
    }

    const fetchCases = async () => {
      const url =
        user.role === 1
          ? "http://localhost:8080/api/cases"
          : "http://localhost:8080/api/cases/secure";
      const token = localStorage.getItem("token");

      try {
        const { data: res } = await axios.get(url, {
          headers: { "x-auth-token": token },
        });
        setCases(res);
      } catch (error) {
        console.error("Error fetching cases:", error);
      }
    };

    fetchCases();
  }, [user.role]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Cases</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Case ID</th>
            <th>Date & Time of Incident</th>
            <th>Location</th>
            <th>Victim Name</th>
            <th>Suspect Name</th>
            <th>Description of Incident</th>
            <th>Charges</th>
            <th>Arrest Information</th>
            <th>Evidence</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((caseItem) => (
            <tr key={caseItem.caseId}>
              <td>
                <div
                  className="scrollable-cell"
                  style={{ width: "100px", height: "50px" }}
                >
                  {caseItem.caseId}
                </div>
              </td>
              <td>
                <div
                  className="scrollable-cell"
                  style={{ width: "175px", height: "50px" }}
                >
                  {new Date(caseItem.dateTimeOfIncident).toLocaleString()}
                </div>
              </td>
              <td>
                <div
                  className="scrollable-cell"
                  style={{ width: "150px", height: "50px" }}
                >
                  {caseItem.location}
                </div>
              </td>
              <td>
                <div
                  className="scrollable-cell"
                  style={{ width: "150px", height: "50px" }}
                >
                  {caseItem.victimName}
                </div>
              </td>
              <td>
                <div
                  className="scrollable-cell"
                  style={{ width: "150px", height: "50px" }}
                >
                  {caseItem.suspectName}
                </div>
              </td>
              <td>
                <div
                  className="scrollable-cell"
                  style={{ width: "200px", height: "50px" }}
                >
                  {caseItem.descriptionOfIncident}
                </div>
              </td>
              <td>
                <div
                  className="scrollable-cell"
                  style={{ width: "150px", height: "50px" }}
                >
                  {caseItem.charges}
                </div>
              </td>
              <td>
                <div
                  className="scrollable-cell"
                  style={{ width: "200px", height: "50px" }}
                >
                  {caseItem.arrestInformation}
                </div>
              </td>
              <td>
                <div
                  className="scrollable-cell"
                  style={{ width: "150px", height: "50px" }}
                >
                  {caseItem.evidence}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
};

export default CaseTable;
