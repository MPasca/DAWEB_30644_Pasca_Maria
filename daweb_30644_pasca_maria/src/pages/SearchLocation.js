import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SearchLocation(){
    var existingLocations = JSON.parse(sessionStorage.getItem("existingDestinations")).map((destination) => destination.location);

    
    const handleClick = () => {
        sessionStorage.setItem("chosenLocation", location);
    }

    const[location, setLocation] = useState(existingLocations[0]);

    return(
        <div style={{display: "inline-flex"}}>
            <div style={{display:"block", width:"80%", marginTop:"-3%"}}>
                <h1 class="h1Title" style={{marginBottom:"-3%"}}>Where next?</h1>
                <hr class="titleLine" style={{marginBottom:"-5%"}}/>
                <div style={{width:"80%", marginTop: "5%"}}>
                    <h2 class="h2Title">Choose a location</h2>
                    <select class="btnTitle"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        >{existingLocations.map((destination) => <option value={destination}>{destination}</option>)}
                    </select>
                    <Link to="/search_date"><button class="btnNav" style={{ display:"flow", marginLeft:"75%", marginTop:"5%"}} onClick={handleClick}>Next</button></Link>
                    <Link to="/home"><button class="btnNav" style={{ display:"flow", marginLeft:"0%", marginTop:"-5%"}}>Back</button></Link>
                </div>
            </div>
            <img class="bgImage" src="seattle.jpg" style={{display:"inline-flex"}}/>
        </div>
    );
}