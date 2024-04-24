import { useState } from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";


import dayjs from 'dayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function AddDestination () {
    const [newLocation, setNewLocation] = useState('');
    const [newPrice, setNewPrice] = useState(0);
    const [newSeats, setNewSeats] = useState(0);
    const [newOffer, setNewOffer] = useState(0);
    const [newDescription, setNewDescription] = useState('');
    const [isChildFriendly, setChildFriendly] = useState(false);
    const [newImagePath, setNewImagePath] = useState('');

    const [startDatePicker, setStartDatePicker] = useState(dayjs());
    const [endDatePicker, setEndDatePicker] = useState(dayjs());


    const handleClick = () => {
        const newDestination = {
            "location": newLocation,
            "description": newDescription,
            "numberOfSeats": parseInt(newSeats),
            "isChildFriendly": isChildFriendly && isChildFriendly == "true",            
            "startDate": dayjs(startDatePicker).format('YYYY-MM-DD'),
            "endDate": dayjs(endDatePicker).format('YYYY-MM-DD'),
            "price": parseInt(newPrice),
            "offer": parseInt(newOffer) || 0,
            "image": newImagePath
        };

        fetch('http://localhost:8000/destinations/create', {
            method: 'POST',
            mode: 'cors',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(newDestination)
        }).then(response => response.json())
        .then(data => {console.log("new destination added: " + data.id)})
        .catch((error) => console.error('Error fetching data:', error));

        window.location.href = `http://localhost:3000/agentdashboard`;
    }

    const handleRadioButtonChange = (event) => {
        setChildFriendly(event.target.value);
    }


    return(
        <div>
            <h1 className="h1Title" style={{paddingTop:"-30px", marginTop:"-2%", marginBottom:"-1%"}}>Add Destination</h1>
            <hr class="titleLine" style={{width:"60%", marginBottom: "1%"}}/>
            <div style={{display:"grid", gridTemplateColumns:"repeat(2, 1fr)", width:"60%", padding:"30px", border:"2px solid black", borderRadius:"10%", backgroundColor:"#D9D9D9", marginBottom:"-1%"}}>
                    <h2>Location:</h2>
                    <TextField required
                        id="idLocation"
                        label="Location"
                        variant="standard"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                    />
            
                    <h2>Description:</h2>
                    <TextField required
                        id="idDescription"
                        label="Description"
                        variant="standard"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />

                    <h2>Price:</h2>
                    <TextField required
                        id="idPrice"
                        label="Price"
                        variant="standard"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                    />  

                    <h2>Number of seats:</h2>
                    <TextField required
                        id="idSeats"
                        label="Number of seats"
                        variant="standard"
                        value={newSeats}
                        onChange={(e) => setNewSeats(e.target.value)}
                    />

                    <h2>Offer percent:</h2>
                    <TextField required
                        id="idOffer"
                        label="Offer percent (0 if no offer)"
                        variant="standard"
                        value={newOffer}
                        onChange={(e) => setNewOffer(e.target.value)}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <h2>Start Date:</h2>

                        <DatePicker
                            label="Start date"
                            value={startDatePicker}
                            onChange={(newValue) => setStartDatePicker(newValue)}
                        />
                        <h2>End Date:</h2>

                        <DatePicker
                            label="End date"
                            value={endDatePicker}
                            onChange={(newValue) => setEndDatePicker(newValue)}
                        />
                    </LocalizationProvider>

                    <h2>Image:</h2>
                    <TextField required
                        id="idImage"
                        label="Image"
                        variant="standard"
                        value={newImagePath}
                        onChange={(e) => setNewImagePath(e.target.value)}
                    />
                    
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Is child friendly?</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="true"
                            name="radio-buttons-group"
                            onChange={handleRadioButtonChange}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="Yes" />
                            <FormControlLabel value={false} control={<Radio />} label="No" />
                    </RadioGroup>
                    </FormControl>
            </div>
            <button className="btnNav" onClick={handleClick} style={{display:"inline-flex", marginTop:"30px", marginLeft:"0px", marginBottom:"10px"}}>Add</button>
            <Link to="/agentdashboard"><button className="btnNav" style={{display:"inline-flex", marginLeft:"60%"}}>Back</button></Link>
        </div>
    );
}