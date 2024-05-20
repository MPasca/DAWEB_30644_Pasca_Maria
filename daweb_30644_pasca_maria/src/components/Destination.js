import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Destination(){
    var id = useParams().id;
    sessionStorage.setItem("destinationId", id);
    var userId = JSON.parse(sessionStorage.getItem("userId"));

    const [destination, setDestination] = useState();

    useEffect(() => {
        fetch(`http://localhost:8000/destinations/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers:{"Content-Type":"application/json"}
        }).then(response => response.json())
            .then(data => { setDestination(data); })
            .catch((error) => console.error('Error fetching data:', error));

    }, [])

    var numberAdults = JSON.parse(sessionStorage.getItem("adults"));
    var numberChildren = JSON.parse(sessionStorage.getItem("children"));
    var noPeople = parseInt(numberAdults) + parseInt(numberChildren);

    const getDate = (date) => {
        var newDate = new Date(date);
        return newDate.getDate();
    }

    const getMonth = (date) => {
        var newDate = new Date(date);
        return newDate.getMonth();
    }

    const getYear = (date) => {
        var newDate = new Date(date);
        return newDate.getYear();
    }

    const getNoDays = (startDate, endDate) => {
        var noDays = new Date(endDate) - new Date(startDate);
        noDays = Math.round(noDays/(1000 * 3600 * 24));
        return noDays;
    }


    const [seePopup, setSeePopup] = useState(false);

    const handleReserveBtn = () => {
        var newReservation = {
            "idUser": userId,
            "idDestination": destination.id,
            "numberOfPeople": noPeople
        };

        fetch(`http://localhost:8000/reservations/create`, {
            method: 'POST',
            mode: 'cors',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(newReservation)
        }).then(response => response.json())
        .catch((error) => console.error('Error fetching data:', error));

        fetch(`http://localhost:8000/destinations/update/${id}`, {
            method: 'PUT',
            mode: 'cors',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"numberOfSeats": (destination.numberOfSeats - noPeople)})
        }).then(response => response.json())
        .catch((error) => console.error('Error fetching data:', error));

        setSeePopup(true);
    }

    const handlePopupBtn = () => {
        setSeePopup(false);
    }

    return(
        <div>
            {destination && 
             <div class="divMaxCard">
                <p class="lblMaxCard">{destination.location} {destination.isOffer ? " - 10% OFF" : " "}</p>
                <hr style={{border:"1px solid black", width:"60%", marginLeft:"3%"}}></hr>
                <div style={{display:"inline-flex", marginBottom:"-20px"}}>
                    <img className="imgMaxCard" src={destination.image}/>
                    <div>
                        <p class="txtMaxCard">{destination.description}</p>
                        <p class="txtMaxCard" style={{fontSize:"34px", marginLeft:"25%"}}>{getNoDays(destination.startDate, destination.endDate) + " days: "} 
                            {getDate(destination.startDate) < 10 ? "0" + getDate(destination.startDate) : getDate(destination.startDate)}.
                            {getMonth(destination.startDate) < 10 ? "0" + parseInt(getMonth(destination.startDate)+1) : parseInt(getMonth(destination.startDate)+1)} - {" "}
                            {getDate(destination.endDate) < 10 ? "0" + getDate(destination.endDate) : getDate(destination.endDate)}.
                            {getMonth(destination.endDate) < 10 ? "0" + parseInt(getMonth(destination.endDate)+1) : parseInt(getMonth(destination.endDate)+1)}
                        </p>
                        <p class="txtMaxCard" style={{fontSize:"34px", marginLeft:"25%", marginTop:"-20px"}}>Seats available: {destination.numberOfSeats}</p>
                        <p class="txtMaxCard" style={{fontSize:"34px", marginLeft:"25%", marginTop:"-20px"}}>Price per night: {destination.price * (100 - destination.offer)/100}€ / night</p>
                        <p class="txtMaxCard" style={{fontSize:"24px", marginLeft:"25%", marginTop: "-20px", fontWeight:"500", color:"red"}}>BEFORE DISCOUNT: {destination.price}€ / night</p>
                        <p class="txtMaxCard" style={{fontSize:"42px", marginLeft:"10px", marginTop:"0px", fontWeight: "650"}}>
                            Total price: {(destination.price * (100 - destination.offer)/100) * getNoDays(destination.startDate, destination.endDate)}€ /  
                            {getNoDays(destination.startDate, destination.endDate)} nights</p>
                    </div>
                </div>
                <div style={{marginTop:"-10px"}}>
                {(noPeople > 0) && <button class="btnMaxCard" onClick={handleReserveBtn}>Reserve</button>}
                {seePopup && 
                <div className="popupReserved">
                    <h1 className="lblPopup">Succes!</h1>
                    <h2 className="txtPopup">Your reservation for {destination.location} {" ("}
                        {getDate(destination.startDate) < 10 ? "0" + getDate(destination.startDate) : getDate(destination.startDate)}.
                        {getMonth(destination.startDate) < 10 ? "0" + parseInt(getMonth(destination.startDate)+1) : parseInt(getMonth(destination.startDate)+1)} - {" "}
                        {getDate(destination.endDate) < 10 ? "0" + getDate(destination.endDate) : getDate(destination.endDate)}.
                        {getMonth(destination.endDate) < 10 ? "0" + parseInt(getMonth(destination.endDate)+1) + ") " : parseInt(getMonth(destination.endDate)+1) + ") "}
                        for {noPeople} people has been confirmed!
                        </h2>
        
                    <button className="btnPopup" onClick={handlePopupBtn}>Go back</button>
                </div>}
                {(!noPeople || noPeople == 0) && <Link to="/search_people"><button class="btnMaxCard">Reserve</button></Link>}
                {!userId && <Link to="/login"><button class="btnMaxCard">Reserve</button></Link>}
                {destination.isChildFriendly &&
                    <img className="icons" style={{marginLeft:"20px"}} src="/children.png"/>}
                </div>
            </div>}
            <Link to="/destinations"><button class="btnNav" style={{marginLeft: "85%", position:"relative"}}>Back</button></Link>
        </div>
    );
}