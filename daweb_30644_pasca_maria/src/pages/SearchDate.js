import { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "../components/DatePicker";

export default function SearchDate(){
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    return(

    <div style={{display: "inline-flex"}}>
    <div style={{display:"block", width:"80%", marginTop:"-3%"}}>
        <h1 class="h1Title" style={{marginBottom:"-3%"}}>Where next?</h1>
        <hr class="titleLine" style={{marginBottom:"-5%"}}/>
        <div style={{width:"80%", marginTop: "5%"}}>
            <h2 class="h2Title">Pick a date for your trip</h2>
            <DatePicker/>
            <Link to="/search_people"><button class="btnBack" style={{ display:"flow", marginLeft:"75%", marginTop:"-5%"}}>Next</button></Link>
            <Link to="/search"><button class="btnBack" style={{ display:"flow", marginLeft:"0%", marginTop:"-5%"}}>Back</button></Link>
        </div>
    </div>
    <img class="bgImage" src="seattle.jpg" style={{display:"inline-flex"}}/>
    </div>

    );
}

