import { Link } from "react-router-dom";

export default function Search(){
    return(
        <div>
            <div style={{display: "inline-flex"}}>
                <div style={{width:"80%", marginTop: "5%"}}>
                    <h1 class="h1Title">Where next?</h1>
                    <hr class="titleLine"/>
                    <h2 class="h2Title">Pick a date for your trip</h2>
                    <input class="btnTitle" placeholder="Search here" style={{marginBottom:"10%", width:"200px", height:"30px"}}/>
                    <Link to="/home"><button class="btnBack" style={{ display:"flow"}}>Back</button></Link>
                </div>
                <img class="bgImage" src="seattle.jpg"/>
            </div>
        </div>
    );
}