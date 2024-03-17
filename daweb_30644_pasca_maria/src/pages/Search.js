import { useState } from "react";
import SearchDate from "../components/SearchDate";
import SearchLocation from "../components/SearchLocation";
import SearchPeople from "../components/SearchPeople";

import { Link } from "react-router-dom";

export default function Search(){
    const [showDate, setShowDate] = useState(false);
    const [showLocation, setShowLocation] = useState(true);
    const [showPeople, setShowPeople] = useState(false);

    const clickNextLocation = event => {
        setShowLocation(false);
        setShowDate(true);
    };

    const clickBackDate = event => {
        setShowDate(false);
        setShowLocation(true);
    };

    const clickNextDate = event => {
        setShowDate(false);
        setShowPeople(true);
    };

    const clickBackPeople = event => {
        setShowPeople(false);
        setShowDate(true);
    };

    return(
        <div style={{display: "inline-flex"}}>
            <div style={{width:"80%", marginTop: "5%"}}>
                {showLocation &&
                <div>
                    <SearchLocation/>
                    <button class="btnBack" style={{ display:"flow", marginLeft:"75%", marginTop:"-5%"}} onClick={clickNextLocation}>Next</button>
                    <Link to="/home"><button class="btnBack" style={{ display:"flow", marginLeft:"0%", marginTop:"-5%"}}>Back</button></Link>
                </div>} 

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
            <img class="bgImage" src="seattle.jpg" style={{display:"inline-flex"}}/>
        </div>
    );
}