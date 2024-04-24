import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";

export default function UpdateDestination () {
    const changeId = JSON.parse(sessionStorage.getItem("destinationId"));

    console.log(changeId);

    const [destinationToUpdate, setDestinationToUpdate] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/destinations/${changeId}`, {
            method: 'GET',
            mode: 'cors',
            headers:{"Content-Type":"application/json"}
        }).then(response => response.json())
            .then(data => {
                setDestinationToUpdate(data);
            });
    }, [])

    
    const [newLocation, setNewLocation] = useState('');
    const [newPrice, setNewPrice] = useState(0);
    const [newSeats, setNewSeats] = useState(0);
    const [newOffer, setNewOffer] = useState(0);
    
    const handleEditBtn = () => {
        if(!newLocation || newLocation == '')
        {   
            setNewLocation(destinationToUpdate.location);
        }

        if(!newPrice || newPrice <= 0)
        {
            setNewPrice(destinationToUpdate.price);
        }

        if(!newSeats || newSeats <= 0)
        {
            setNewSeats(destinationToUpdate.numberOfSeats);
        }

        if(!newOffer || newOffer < 0)
        {
            setNewOffer(destinationToUpdate.offer);
        }

        const updatedData = {"location": newLocation,
                            "price" : newPrice,
                            "numberOfSeats" : newSeats, 
                            "offer" : newOffer};


        fetch(`http://localhost:8000/destinations/update/${changeId}`, {
            method: 'PUT',
            mode: 'cors',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(updatedData)
        }).then(response => response.json())
        .then(data => {console.log("destination updated: " + data.id);
            // window.location.href = `http://localhost:3000/agentdashboard`;
        });

    }


    return(
        <div>
            <h1 className="h1Title">Edit destination {changeId}</h1>
            <hr class="titleLine" style={{width:"60%", marginBottom: "1%"}}/>
            <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", width:"60%", padding:"30px", border:"2px solid black", borderRadius:"10%", backgroundColor:"#D9D9D9"}}>
                    <h2 style={{marginBottom:"50px"}}>Location:</h2>
                    <TextField
                        id="idLocation"
                        label="Location"
                        defaultValue={destinationToUpdate.location}
                        onChange={(e) => setNewLocation(e.target.value)}
                    />

                    <h2 style={{marginBottom:"50px"}}>Price:</h2>
                    <TextField
                        id="idPrice"
                        label="Price"
                        defaultValue={destinationToUpdate.price}
                        onChange={(e) => setNewPrice(e.target.value)}
                        helperText="The value must be greater than 0"
                    />

                    <h2 style={{marginBottom:"50px"}}>Number of seats:</h2>
                    <TextField
                        id="idSeats"
                        label="Number of seats"
                        defaultValue={destinationToUpdate.noSeats}
                        onChange={(e) => setNewSeats(e.target.value)}
                        helperText="The value must be greater than 0"
                    />
                    
                    <h2 style={{marginBottom:"50px"}}>Offer percent:</h2>
                    <TextField
                        id="idOffer"
                        label="Offer percent"
                        defaultValue={destinationToUpdate.offer}
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