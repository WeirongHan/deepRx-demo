import React from "react";
import "../styles/Patient.css"

function Patient({ patient, onDelete }) {
    const formattedDate = new Date(patient.created_at).toLocaleDateString("en-US")

    return (
        <div className="patient-container">
            <p className="patient-name">{patient.name}</p>
            <p className="patient-rna-sequence">{patient.rna_sequence}</p>
            <p className="patient-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(patient.id)}>
                Delete
            </button>
        </div>
    );
}

export default Patient