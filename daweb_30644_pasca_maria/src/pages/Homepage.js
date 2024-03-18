import { Link } from "react-router-dom";

export default function Homepage(){
    localStorage.setItem("showLocation", "true");
    localStorage.setItem("showDate", "false");
    localStorage.setItem("showPeople", "false");

    return(
    <div>
        <div style={{display: "inline-flex"}}>
            <div style={{width:"80%", marginTop: "5%"}}>
                <h1 class="h1Title">Where next?</h1>
                <hr class="titleLine"/>
                <h2 class="h2Title">Find your next destination</h2>
                <Link to="/search"><btn class="btnTitle" style={{marginBottom:"10%"}}>Search here</btn></Link>
            </div>
            <img class="bgImage" src="seattle.jpg"/>
        </div>
    </div>
    );
}