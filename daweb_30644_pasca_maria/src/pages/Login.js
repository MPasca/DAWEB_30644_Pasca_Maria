import { TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login (){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    var destinationId = JSON.parse(sessionStorage.getItem("destinationId"));

    const handleClick = (e) => {
        e.preventDefault()
        const credentials = {email, password};
        console.log(credentials);
        
        fetch('http://localhost:8000/login', {
            method: 'POST',
            mode: 'cors',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"email":email, "password":password})
        }).then(response => response.json())
            .then(data => {
                sessionStorage.setItem("userId", data.userId);
                sessionStorage.setItem("role", data.role);
                window.location.href = data.role == 'agent' && `http://localhost:3000/agentdashboard`||
                                    !destinationId && `http://localhost:3000/` || 
                                    destinationId && `http://localhost:3000/destination/${destinationId}`;
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