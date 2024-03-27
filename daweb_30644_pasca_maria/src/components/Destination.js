import { Link, useParams } from "react-router-dom";
import Popup from 'reactjs-popup';

export default function Destination(){
    var id = useParams().id;
    var existingDestinations = JSON.parse(localStorage.getItem("mocks"));
    localStorage.setItem("id", id);

    var numberAdults = JSON.parse(localStorage.getItem("adults"));
    var numberChildren = JSON.parse(localStorage.getItem("children"));
    var noPeople = parseInt(numberAdults) + parseInt(numberChildren);

    const handleReserveBtn = (reservedSeats) => {
        existingDestinations[id].noSeats -= reservedSeats;
    }

    const showDestination = existingDestinations.filter((destination) => destination.id == id).map((destination)=>{
        var startDate = new Date(destination.startDate);
        var endDate = new Date(destination.endDate);
        var noDays = (endDate - startDate);
        noDays = Math.round(noDays/(1000 * 3600 * 24));
    
        return(
        <div class="divMaxCard">
            <p class="lblMaxCard">{destination.location} {destination.isOffer ? " - 10% OFF" : " "}</p>
            <hr style={{border:"1px solid black", width:"60%", marginLeft:"3%"}}></hr>
            <div style={{display:"inline-flex", marginBottom:"-20px"}}>
                <img className="imgMaxCard" src={"/"+destination.img}/>
                <div>
                    <p class="txtMaxCard">{destination.description}</p>
                    <p class="txtMaxCard" style={{fontSize:"38px", marginLeft:"35%"}}>{noDays + " days: "} 
                        {startDate.getDate() < 10 ? "0" + startDate.getDate() : startDate.getDate()}.
                        {startDate.getMonth() < 10 ? "0" + startDate.getMonth() : startDate.getMonth()} - {" "}
                        {endDate.getDate() < 10 ? "0" + endDate.getDate() : endDate.getDate()}.
                        {endDate.getMonth() < 10 ? "0" + endDate.getMonth() : endDate.getMonth()}
                    </p>
                    <p class="txtMaxCard" style={{fontSize:"38px", marginLeft:"35%"}}>Seats available: {destination.noSeats}</p>
                    <p class="txtMaxCard" style={{fontSize:"38px", marginLeft:"35%"}}>Price per day: {destination.isOffer ? destination.price * 0.9 : destination.price}€ / {noDays} days</p>
                </div>
            </div>
            <div style={{marginTop:"-10px"}}>
                {(noPeople > 0) && 
                    <Popup trigger={<button class="btnMaxCard" onClick={() => handleReserveBtn = (noPeople)}>Reserve</button>}>
                            <div className="popupReserved">
                                <h1 className="lblPopup">Succes!</h1>
                                <h2 className="txtPopup">Your reservation for {destination.location} {" ("}
                                {startDate.getDate() < 10 ? "0" + startDate.getDate() : startDate.getDate()}.
                                {startDate.getMonth() < 10 ? "0" + startDate.getMonth() : startDate.getMonth()} - {" "}
                                {endDate.getDate() < 10 ? "0" + endDate.getDate() : endDate.getDate()}.
                                {endDate.getMonth() < 10 ? "0" + endDate.getMonth() + ") " : endDate.getMonth() + ") "}
                                for {noPeople} people has been confirmed! </h2>
                                <Link to="/"><button className="btnPopup">Go back</button></Link>
                            </div>
                    </Popup>}
                {(noPeople == 0) && <Link to="/search_people"><button class="btnMaxCard">Reserve</button></Link>}
                {destination.childFriendly &&
                    <img className="icons" style={{marginLeft:"20px"}} src="/children.png"/>}
            </div>
        </div>);
    })

    return(
        <div>
            {showDestination}
            <Link to="/destinations"><button class="btnNav" style={{marginLeft: "85%", position:"relative"}}>Back</button></Link>
        </div>
    );
}