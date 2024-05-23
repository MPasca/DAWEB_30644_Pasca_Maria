import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ChartVis from "../components/ChartVis";

export default function ShowReservationsStatistic(){
    var existingLocations = Array.from(new Set(JSON.parse(sessionStorage.getItem("existingDestinations")).map((destination) => destination.location)));    

    const [byReservation, setByReservation] = useState(true);
    const [chosenLocation, setChosenLocation] = useState(existingLocations[0]);

    const handleReservationsClick = () => {
        setByReservation(prevState => !prevState);
    }

    return(
        <div style={{paddingTop:"2%"}}>
            <div style={{display:"block"}}>
            <select style={{border:"1px solid black", borderRadius:"25px", display:"inline-flex", fontSize:"32px", marginLeft:"50px", paddingLeft:"15px", width:"350px", height:"90px", alignItems:"center", background:"#D9D9D9"}}
                value={chosenLocation}
                onChange={e => setChosenLocation(e.target.value)}
                >{existingLocations.map((destination) => <option value={destination}>{destination}</option>)}
            </select>

            <btn className="btnNav" onClick={handleReservationsClick} style={{display:"inline-flex", width:"400px", height:"100px", marginLeft:"10%", padding:".5%", paddingLeft:"2%"}}>{byReservation && "By number of reservations" || "By number of goers"}</btn>

            </div>
            <h1 class="h1Title">Statistics</h1>
            <hr class="titleLine" style={{marginBottom:"50px", width:"auto", marginRight:"30%"}}></hr>
            <div>
                <ChartVis byReservation={byReservation} chosenLocation={chosenLocation}/>
            </div>
            <Link to="/destinations"><button class="btnNav" style={{marginTop:"5%", width:"auto", marginLeft: "0%", marginBottom:"5%"}}>Back</button></Link>
        </div>
    );
}