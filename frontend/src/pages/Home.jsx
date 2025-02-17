import {useState, useEffect} from "react"
import api from "../api"
import Patient from "../components/Patient"
import "../styles/Home.css"

function Home() {
    const [patients, setPatients] = useState([]);
    const [name, setName] = useState("")
    const [rnaSequence, setRnaSequence] = useState("")
    
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
        }).catch((err) => alert(err));
    };

    return <div>
        <div>
            <h2> Patients </h2>
            {patients.map((patient) => <Patient patient={patient} onDelete={deletePatient} key={patient.id} />)}
        </div>
        <h2> Create a patient </h2>
        <form onSubmit={createPatient}>
            <label htmlFor="name"> Name:</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required/>
        <br/>
        <input type="submit" value="Submit"></input>  
        </form>
        
    </div>
}

export default Home