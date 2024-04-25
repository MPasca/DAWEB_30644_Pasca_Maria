import { TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login (){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = (e) => {
        e.preventDefault()
        const credentials = {email, password};
        console.log(credentials);
        let id;
        // send to backend for confirmation
        if(email == "agent") {
            if(password == "password_agent123") {
                id = 0;
                sessionStorage.setItem("userId", id);
                window.location.href = `http://localhost:3000/agentdashboard`;
            }
            else {
                throw new Error("wrong password");
            }
        }
        const role = "agent"
        sessionStorage.setItem("role", role);

        fetch('http://localhost:8000/login', {
            method: 'POST',
            mode: 'cors',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"email":email, "password":password})
        }).then(response => response.json())
            .then(data => {
                const id = data.id;
                sessionStorage.setItem("userId", id);
                sessionStorage.setItem("role", "client");
                window.location.href = `http://localhost:3000/`;
            })
            .catch((error) => console.error('Error when trying to log in:', error));
    }

    return(
        <div style={{display: "inline-flex",  overflow: "hidden"}}>
            <div style={{width:"80%", marginTop: "5%"}}>
                <h1 class="h1Title">Login</h1>
                <hr class="titleLine"/>
                <div style={{backgroundColor:"#D9D9D9", display:"inline-flex", marginTop:"5%", padding:"2%", paddingBottom: "5%", border: "1px solid black", borderRadius: "25px", marginBottom:"5%"}}>
                    <TextField required
                        id="idEmail"
                        label="Email"
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField required
                        id="idPassword"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <btn class="btnTitle btnRegisterLogin" style={{marginBottom:"0%", textAlign: "center", display:"table"}} onClick={handleClick}>Login</btn>
                <Link to="/register"><button class="btnNav" style={{ display:"block", marginTop:"10%", marginLeft:"0%", width:"auto", paddingLeft:"3%", paddingRight:"3%", textDecoration:"none"}}>Register instead</button></Link>
            </div>
            <img class="bgImage" src="seattle.jpg"/>
        </div>
    );
}