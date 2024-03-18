import { useState } from "react";
import SearchDate from "./SearchDate";
import SearchLocation from "../components/SearchLocation";
import SearchPeople from "../components/SearchPeople";

import { Link } from "react-router-dom";

export default function Search(){
    var showDate = JSON.parse(localStorage.getItem("showDate"));
    var showLocation = JSON.parse(localStorage.getItem("showLocation"));
    var showPeople = JSON.parse(localStorage.getItem("showPeople"));

    const clickBackDate = event => {
        showDate = false;
        showLocation = true;
    };

    const clickNextDate = event => {
        showDate = false;
        showPeople = true;
    };

    const clickBackPeople = event => {
        showPeople = false;
        showDate = true;
    };

    return(
        <div style={{display: "inline-flex"}}>
            <div style={{display:"block", width:"80%", marginTop:"-3%"}}>
                <h1 class="h1Title" style={{marginBottom:"-3%"}}>Where next?</h1>
                <hr class="titleLine" style={{marginBottom:"-5%"}}/>
                <div style={{}}>
                    {showLocation && <SearchLocation/>} 

                    {showDate && 
                    <div>
                        <SearchDate/>
                        <button class="btnBack" style={{ display:"flow", marginLeft:"75%", marginTop:"-5%"}} onClick={clickNextDate}>Next</button>
                        <button class="btnBack" style={{ display:"flow", marginLeft:"0%", marginTop:"-5%"}} onClick={clickBackDate}>Back</button>
                    </div>}

                    {showPeople &&
                    <div>
                        <SearchPeople/>
                        <Link to="/destinations"><button class="btnBack" style={{ display:"flow", marginLeft:"75%", marginTop:"-5%"}} >Next</button></Link>
                        <button class="btnBack" style={{ display:"flow", marginLeft:"0%", marginTop:"-5%"}} onClick={clickBackPeople}>Back</button>
                    </div>}
                </div>
            </div>
            <img class="bgImage" src="seattle.jpg" style={{display:"inline-flex"}}/>
        </div>
    );
}