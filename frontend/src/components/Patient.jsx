import React from "react";
import "../styles/Patient.css"

function Patient({ patient, onUploadRNA, onDelete, onRunDiagnose, onGetDiagnose }) {
    const formattedDate = new Date(patient.created_at).toLocaleDateString("en-US")

    return (
        <div className="patient-container">
            <p className="patient-name"><strong>Patient Name: </strong>{patient.name}</p>
            <p className="patient-rna-sequence"><strong>RNA Sequence: </strong>{patient.rna_sequence}</p>
            <p className="patient-date"><strong>Created At: </strong>{formattedDate}</p>
            <button className="upload-rna-button" onClick={() => document.getElementById(`upload-${patient.id}`).click()}>
                Upload RNA
            </button>
            <input
                type="file"
                id={`upload-${patient.id}`}
                accept=".xlsx, .xls"
                style={{ display: "none" }}
                onChange={(e) => onUploadRNA(e, patient.id)}
            />
           <button
                className="run-diagnose-button"
                style={{
                    marginRight: "10px",
                    backgroundColor: patient.rna_sequence === '' ? 'gray' : 'blue',
                    cursor: patient.rna_sequence === '' ? 'not-allowed' : 'pointer'
                }}
                onClick={() => onRunDiagnose(patient.id)}
                disabled={patient.rna_sequence === ''}
            >
                Run Diagnose
            </button>

            <button 
                className="show-diagnose-button" 
                style={{ marginRight: "10px"}}
                onClick={() => onGetDiagnose(patient.id)}
            >
                Diagnose Results
            </button>
            <button className="delete-button" onClick={() => onDelete(patient.id)}>
                Delete
            </button>

        </div>
    );
}

export default Patient