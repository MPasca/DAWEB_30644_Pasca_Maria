import { TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleClick = (e) => {
        e.preventDefault()
        if(password != confirmPassword){
            console.log("passwords don't match");
        }
        else{
            const credentials = {email, password};
            fetch('http://localhost:8000/users/create', {
                method: 'POST',
                mode: 'cors',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(credentials)
            }).then(response => response.json())
            .catch((error) => console.error('Error registering user:', error));

    
            window.location.href = `http://localhost:3000`;

        }
    }


    return(
        <div style={{display: "inline-flex",  overflow: "hidden"}}>
            <div style={{width:"80%", marginTop: "5%"}}>
                <h1 class="h1Title">Register</h1>
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
                    <TextField required
                        id="idCPassword"
                        label="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <btn class="btnTitle btnRegisterLogin" style={{marginBottom:"0%", textAlign: "center", display:"table"}} onClick={handleClick}>Register</btn>
                <Link to="/login"><button class="btnNav" style={{ display:"block", marginTop:"10%", marginLeft:"0%", width:"auto", paddingLeft:"3%", paddingRight:"3%", textDecoration:"none"}}>Back to login</button></Link>
            </div>
            <img class="bgImage" src="seattle.jpg"/>
        </div>
    );

}