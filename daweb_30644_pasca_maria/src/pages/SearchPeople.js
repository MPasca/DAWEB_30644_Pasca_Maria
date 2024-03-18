import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchPeople(){
    const [people, setPeople] = useState(0);

    const handleClick = () => {
        localStorage.setItem("people", JSON.stringify(people));
    } 

    return(
        <div style={{display: "inline-flex"}}>
        <div style={{display:"block", width:"80%", marginTop:"-3%"}}>
            <h1 class="h1Title" style={{marginBottom:"-3%"}}>Where next?</h1>
            <hr class="titleLine" style={{marginBottom:"-5%"}}/>
            <div style={{width:"80%", marginTop: "5%"}}>
                <h2 class="h2Title">How many people are going</h2>
                <input class="btnTitle" placeholder="Type here" style={{marginBottom:"10%", width:"200px", height:"30px"}}
                    id="txtPeople" value={people} onChange={(e) => setPeople(e.target.value)}/>
                <Link to="/destinations"><button class="btnBack" style={{ display:"flow", marginLeft:"75%", marginTop:"-5%"}} onClick={handleClick}>Next</button></Link>
                <Link to="/search_date"><button class="btnBack" style={{ display:"flow", marginLeft:"0%", marginTop:"-5%"}}>Back</button></Link>
            </div>
        </div>
        <img class="bgImage" src="seattle.jpg" style={{display:"inline-flex"}}/>
        </div>

    );
}