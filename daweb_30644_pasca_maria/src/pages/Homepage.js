import { Link } from "react-router-dom";

export default function Homepage(){
    sessionStorage.removeItem("chosenLocation");
    sessionStorage.removeItem("adults");
    sessionStorage.removeItem("children");
    sessionStorage.removeItem("startDate");
    sessionStorage.removeItem("endDate");
    sessionStorage.removeItem("showOffers");
    sessionStorage.removeItem("destinationId");
      
    return(
          <div style={{display: "inline-flex", padding:"0px", margin:"0px"}}>
              <div style={{width:"80%", marginTop: "5%"}}>
                  <h1 class="h1Title">Where next?</h1>
                  <hr class="titleLine"/>
                  <h2 class="h2Title">Find your next destination</h2>
                  <Link to="/search"><btn class="btnTitle" style={{marginBottom:"10%"}}>Search here</btn></Link>
              </div>
              <img class="bgImage" src="seattle.jpg" style={{marginLeft:"30px"}}/>
          </div>
    );
}