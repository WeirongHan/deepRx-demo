import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "../components/LoadingIndicator"

// for login and register
function Form({route, method}) {
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const[loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "login" : "register"
    const other = method === "login" ? "register" : "login"
    const handleSubmit = async (e) => {
        setLoading(true)
        // prevent reload page
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            alert("Username and password cannot be empty!");
            setLoading(false);
            return;
        }

        try{
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        }
        catch(error) {
            alert(error)
        } finally{
            setLoading(false)
        }
    }
    return <form onSubmit={handleSubmit} className = "form-container">
        <h1>{name}</h1>
        <input className="form-input" type="text"  value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
        <input className="form-input" type="password"  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
        {loading && <LoadingIndicator />}
        <button className="form-button" type="submit"> {name} </button>
        <button className="form-button" type="submit" onClick={(e) => { e.preventDefault(); navigate(`/${other}`); }}> {other}</button>
    </form>
}

export default Form