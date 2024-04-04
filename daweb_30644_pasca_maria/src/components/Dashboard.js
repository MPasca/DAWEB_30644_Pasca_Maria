import { Link } from "react-router-dom";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Popup from 'reactjs-popup';
import { TextField } from "@mui/material";
import { useState } from "react";


export default function Dashboard () {
    var existingDestinations = JSON.parse(localStorage.getItem("mocks"));

    const [newLocation, setNewLocation] = useState('');
    const [newPrice, setNewPrice] = useState(0);
    const [newSeats, setNewSeats] = useState(0);
    const [newOffer, setNewOffer] = useState(0);

    const handleEditBtn = (id) => {
        if(newLocation != '')
        {
            // send request to backend to update location
            existingDestinations[id-1].location = newLocation;
        }

        if(newPrice > 0)
        {
            // send request to backend to update price
            existingDestinations[id-1].price = newPrice;
        }

        if(newSeats > 0)
        {
            // send request to backend to update seats (check if the number is greater than the number of seats already reserved)
            existingDestinations[id-1].noSeats = newSeats;
        }

        if(newOffer >= 0)
        {
            // send request to backend to update offer
            existingDestinations[id-1].offer = newOffer;
        }

        console.log("updated destination " + id +": " + existingDestinations[id-1]);
    }

    const showDestinations = existingDestinations.map((destination) => {
            return (
            <tr key={destination.id}>
                <td style={{whiteSpace: 'nowrap'}}>{destination.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{destination.location}</td>
                <td style={{whiteSpace: 'nowrap'}}>{destination.price}</td>
                <td style={{whiteSpace: 'nowrap'}}>{destination.noSeats}</td>
                <td style={{whiteSpace: 'nowrap'}}>{JSON.stringify(destination.childFriendly)}</td>
                <td style={{whiteSpace: 'nowrap'}}>{destination.offer}</td>
                <td style={{whiteSpace: 'nowrap'}}> 
                    <Popup trigger={<button style={{border:"0px"}} onClick={handleEditBtn}><img style={{width:"50px", height:"50px", alignSelf:"center"}} src="/edit_icon.png"/></button>}>
                            <div className="popupEdit">
                                <h1 className="lblPopup">Edit destination {destination.id}</h1>
                                <TextField required
                                    id="idLocation"
                                    label="Location"
                                    variant="standard"
                                    value={newLocation}
                                    placeholder={destination.location}
                                    onChange={(e) => setNewLocation(e.target.value)}
                                />
                                <TextField required
                                    id="idPrice"
                                    label="Price"
                                    variant="standard"
                                    value={newPrice}
                                    placeholder={destination.price}
                                    type="number"
                                    onChange={(e) => setNewPrice(e.target.value)}
                                />  
                                <TextField required
                                    id="idSeats"
                                    label="Number of seats"
                                    variant="standard"
                                    value={newSeats}
                                    placeholder={destination.noSeats}
                                    type="number"
                                    onChange={(e) => setNewSeats(e.target.value)}
                                />
                                <TextField required
                                    id="idOffer"
                                    label="Offer percent (0 if no offer)"
                                    variant="standard"
                                    value={newOffer}
                                    placeholder={destination.noOffer}
                                    type="number"
                                    onChange={(e) => setNewOffer(e.target.value)}
                                />
                                <button className="btnPopup" onClick={handleEditBtn(destination.id)} style={{display:"block", marginTop:"50px" }}>Change</button>
                            </div>
                    </Popup>
                </td>
            </tr>);
    });


    return(
        <Paper sx={{ width: 'auto', maxWidth:"78%"}}>
            <Table sx={{ maxWidth:"200px" }} aria-label="simple table" class="dashboard-table">
                <thead>
                    <tr>
                        <th style={{paddingLeft:"10px", paddingRight:"10px", textAlign:"center"}}>Id</th>
                        <th style={{width:"300px"}}>Location</th>
                        <th style={{width:"auto"}}>Price</th>
                        <th style={{width:"auto"}}>Seats</th>
                        <th style={{width:"auto"}}>Child friendly</th>
                        <th style={{width:"auto"}}>Offer</th>
                        <th style={{maxWidth:"34px"}}>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {showDestinations}
                </tbody>
            </Table>
        </Paper>
    );
}