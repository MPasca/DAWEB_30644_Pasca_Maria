import { useState } from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";

export default function UpdateDestination () {
    const changeId = JSON.parse(sessionStorage.getItem("destinationId"));
    console.log(changeId);

    const existingDestinations = JSON.parse(localStorage.getItem("mocks"));
    var crtDestination = existingDestinations.filter((destination) => destination.id == changeId);
    console.log(crtDestination);
    
    const [newLocation, setNewLocation] = useState('');
    const [newPrice, setNewPrice] = useState(0);
    const [newSeats, setNewSeats] = useState(0);
    const [newOffer, setNewOffer] = useState(0);
    
    const handleEditBtn = () => {
        if(newLocation != '')
        {   
            // send request to backend to update location
            crtDestination.location = newLocation;
            console.log("new destination: " + crtDestination.location);
        }

        if(newPrice > 0)
        {
            // send request to backend to update price
            crtDestination.price = newPrice;
            console.log("new price: " + crtDestination.price)
        }

        if(newSeats > 0)
        {
            // send request to backend to update seats (check if the number is greater than the number of seats already reserved)
            crtDestination.noSeats = newSeats;
            console.log("current number of seats: " + crtDestination.seats)
        }

        if(newOffer >= 0)
        {
            // send request to backend to update offer
            crtDestination.offer = newOffer;
            console.log("current offer: " + crtDestination.offer)
        }
    }


    return(
        <div>
            <h1 className="h1Title">Edit destination {crtDestination.id}</h1>
            <hr class="titleLine" style={{width:"60%", marginBottom: "1%"}}/>
            <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", width:"60%", padding:"30px", border:"2px solid black", borderRadius:"10%", backgroundColor:"#D9D9D9"}}>
                    <h2 style={{marginBottom:"50px"}}>Location:</h2>
                    <TextField
                        id="idLocation"
                        label="Location"
                        defaultValue={crtDestination[0].location}
                        onChange={(e) => setNewLocation(e.target.value)}
                    />

                    <h2 style={{marginBottom:"50px"}}>Price:</h2>
                    <TextField
                        id="idPrice"
                        label="Price"
                        defaultValue={crtDestination[0].price}
                        onChange={(e) => setNewPrice(e.target.value)}
                        helperText="The value must be greater than 0"
                    />

                    <h2 style={{marginBottom:"50px"}}>Number of seats:</h2>
                    <TextField
                        id="idSeats"
                        label="Number of seats"
                        defaultValue={crtDestination[0].noSeats}
                        onChange={(e) => setNewSeats(e.target.value)}
                        helperText="The value must be greater than 0"
                    />
                    
                    <h2 style={{marginBottom:"50px"}}>Offer percent:</h2>
                    <TextField
                        id="idOffer"
                        label="Offer percent"
                        defaultValue={crtDestination[0].offer}
                        onChange={(e) => setNewOffer(e.target.value)}
                        helperText="The value is 0 if no offer, otherwise greater than 0."
                    />
            </div>
            <div>
                <button className="btnNav" onClick={handleEditBtn} style={{display:"inline-flex", marginTop:"30px", marginLeft:"0px"}}>Change</button>
                <Link to="/agentdashboard"><button className="btnNav" style={{display:"inline-flex", marginLeft:"60%"}}>Back</button></Link>
            </div>
        </div>
    );
}