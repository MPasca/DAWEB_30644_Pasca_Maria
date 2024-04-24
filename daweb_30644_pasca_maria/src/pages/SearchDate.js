import { useState } from "react";
import { Link } from "react-router-dom";
import { DateRangePicker } from "react-date-range";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function SearchDate(){
    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const handleChange = (ranges) => {
        setDate(ranges.selection);
    };

    const handleClick = () => {
        sessionStorage.setItem("startDate", JSON.stringify(date.startDate).split('T')[0]+"\"");
        sessionStorage.setItem("endDate", JSON.stringify(date.endDate).split('T')[0]+"\"");
    }

    return(
    <div style={{display: "inline-flex"}}>
        <div style={{display:"block", width:"80%", marginTop:"-3%"}}>
            <h1 class="h1Title" style={{marginBottom:"-3%"}}>Where next?</h1>
            <hr class="titleLine" style={{marginBottom:"-5%"}}/>
            <h2 class="h2Title" style={{marginTop:"5%", marginBottom:"1%"}}>Pick a date for your trip</h2>
            <div style={{display:"inline-flex", marginTop:"1%", marginLeft:"5%"}}>
                <div style={{margin:"0px", padding:"10px", backgroundColor:"white", borderRadius:"25px", border:"1px solid black"}}>
                <DateRangePicker
                    className="dateRange"
                    ranges={[date]}
                    onChange={handleChange}
                    minDate={new Date()}
                />
                </div>
                <div style={{marginLeft:"20%"}}>
                    <Link to="/search_people"><button class="btnNav" style={{ display:"block", marginTop:"30%"}} onClick={handleClick}>Next</button></Link>
                    <Link to="/search"><button class="btnNav" style={{ display:"block", marginTop:"90%"}}>Back</button></Link>
                </div>
            </div>
        </div>
        <img class="bgImage" src="seattle.jpg" style={{display:"inline-flex", marginLeft:"-80px"}}/>
    </div>

    );
}

