import {useState, useEffect} from "react"
import api from "../api"
import Patient from "../components/Patient"
import "../styles/Home.css"
import { useNavigate } from "react-router-dom";

function Home() {
    const [patients, setPatients] = useState([]);
    const [name, setName] = useState("")
    const [showForm, setShowForm] = useState(false);
    const [diagnoseResult, setDiagnoseResult] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    // call getPatients when visit the page
    useEffect(() => {
        getPatients();
    }, []);

    const getPatients = () => {
        api.get("/api/patients/")
        .then(res => res.data)
        .then((data) => {setPatients(data); console.log(data)})
        .catch((err) => alert(err));
    }

    const deletePatient = (id) => {
        api.delete(`/api/patients/delete/${id}/`)
        .then((res) => {
            if (res.status === 204) alert("Patient deleted!");
            else alert("Failed to delete patient.");
            getPatients();
        }).catch((error) => alert(error));
    };

    const createPatient = (e) => {
        e.preventDefault();
        api.post("/api/patients/", { name })
        .then((res) => {
            if (res.status === 201) alert("Patient created!");
            else alert("Failed to create patient.");
            getPatients();
            setShowForm(false);
        }).catch((err) => alert(err));
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    const handleFileUpload = (event, patientId) => {
        const file = event.target.files[0];
        if (!file) {
            console.log("No file selected");
            return;
        }
        // Create form data to send file to API
        const formData = new FormData();
        formData.append("rna_file", file);

        api.put(`/api/patients/upload_rna/${patientId}/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
            if (res.status === 200) alert("RNA file uploaded successfully!");
            else alert("Failed to upload RNA file.");
            getPatients(); // Refresh patient data after upload
        })
        .catch(err => alert("Error uploading file: " + err));
    };

    const runDiagnose = (patientId) => {
        api.post(`/api/patients/run_diagnose/${patientId}/`)
        .then((res) => {
            if (res.status === 201) alert("Diagnose Created!");
            else alert("Failed to create diagnose.");
            getPatients();
            setShowForm(false);
        }).catch((err) => alert(err));
    };

    const getDiagnose = (patientId) => {
        api.get(`/api/patients/diagnose/${patientId}/`)
            .then(res => {
                const filteredDiagnoses = res.data.filter(diagnosis => diagnosis.patient === patientId);
                setDiagnoseResult(filteredDiagnoses); // Store only the relevant results in state
                setShowModal(true); // Open modal
            })
            .catch(err => alert("Failed to fetch diagnose result: " + err));
    };

    return (
        <div>
            <div style={{ display: "flex" }}>
                <button className="logout-button" onClick={() => navigate("/logout")}>
                            Logout
                </button>
            </div>
            <h2>Patients</h2>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px' }}>
                <button className="add-patient-button" onClick={() => setShowForm(!showForm)}>
                    Add Patient
                </button>
            </div>
            <div>
                {patients.map((patient) => (
                    <Patient patient={patient} onUploadRNA={handleFileUpload} onRunDiagnose={runDiagnose} onDelete={deletePatient} 
                    onGetDiagnose={getDiagnose} key={patient.id} />
                ))}
            </div>
            {showForm && (
                <form onSubmit={createPatient}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <br />
                    <input type="submit" value="Add Single Patient" />
                    <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>
                        Cancel
                    </button>
                </form>
            )}
            {showModal && diagnoseResult && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Diagnose Results</h2>
                    {diagnoseResult.length > 0 ? (
                        diagnoseResult.map((result, index) => (
                            <div key={index} style={{ marginBottom: "10px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
                                <p><strong>RNA Sequence:</strong> {result.rna_sequence}</p>
                                <p><strong>Diagnosis:</strong> {result.result || "No Diagnosis Available"}</p>
                                <p><strong>Created At:</strong> {new Date(result.created_at).toLocaleString()}</p>
                            </div>
                        ))
                    ) : (
                        <p>No diagnosis available for this patient.</p>
                    )}
                    <button onClick={() => setShowModal(false)}>Close</button>
                </div>
            </div>
        )}
        </div>
    );
}

export default Home