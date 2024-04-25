import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import dayjs, { Dayjs } from 'dayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createFilterOptions } from "@mui/material";

export default function Destinations(){
    sessionStorage.getItem("id") && sessionStorage.removeItem("id");

    var chosenLocation = sessionStorage.getItem("chosenLocation");
    var numberAdults = JSON.parse(sessionStorage.getItem("adults"));
    var numberChildren = JSON.parse(sessionStorage.getItem("children"));
    var storageStartDate = JSON.parse(sessionStorage.getItem("startDate"));
    var storageEndDate = JSON.parse(sessionStorage.getItem("endDate"));

    var onlyOffers = JSON.parse(sessionStorage.getItem("showOffers"));

    const [existingDestinations, setExistingDestinations] = useState();

    useEffect(() => {
        fetch('http://localhost:8000/destinations', {
            method: 'GET',
            mode: 'cors',
            headers:{"Content-Type":"application/json"}
        }).then(response => response.json())
            .then(data => { setExistingDestinations(data); })
            .catch((error) => console.error('Error fetching data:', error));

    }, [])

    const [startDate, setStartDate] = React.useState(storageStartDate);
    const [endDate, setEndDate] = React.useState(storageEndDate);

    const [startDatePicker, setStartDatePicker] = React.useState(dayjs());
    const [endDatePicker, setEndDatePicker] = React.useState(dayjs());


    const [showOffers, setShowOffers] = useState(onlyOffers);

    const showOffersOnly = () => {
        setShowOffers((prev) => !prev);
    }

    const filterResult = () => {
        var result = existingDestinations;
        if(chosenLocation){
            result = result.filter((destination) => destination.location === chosenLocation);
        } 

        if(startDate && endDate && startDate !== endDate){
            result = result.filter((destination) => destination.startDate >= startDate);
            result = result.filter((destination) => destination.endDate <= endDate); 
        }
        if(numberChildren > 0){
            result = result.filter((destination) => destination.isChildFriendly);
        }

        if(numberAdults || numberChildren)
        {
            result = result.filter((destination) => numberChildren + numberAdults < destination.numberOfSeats);
        }

        console.log(result);
        return result;
    }

    const [destinations, setDestinations] = useState();
    useEffect(() => {
        if(existingDestinations) {
            setDestinations(filterResult());
        }
    }, [existingDestinations])


    const showDestinations = destinations && destinations.map((destination) => {
        return(
            (!showOffers || (showOffers && destination.offer != 0)) &&
            <div class="divMinCard">
                <p class="lblMinCard">{destination.location}</p>
                <img className="imgMinCard" src={destination.image} style={{marginBottom:"40px"}}/>
                {destination.offer > 0 && 
                <div>
                 <p class="lblMinCard" style={{marginTop:"-10px", padding:"0px"}}>SPECIAL OFFER: {destination.offer}% OFF</p>
                </div>}
                {destination.offer == 0 && <h1 style={{paddingBottom:"20px"}}/>}
                <Link to={`/destination/${destination.id}`}><btn class="btnMinCard" style={{marginTop:"20px"}}>Details</btn></Link>
            </div>
        );
    });

    const handleFilterClick = () => {
        if(startDatePicker <= endDatePicker) {
            if(startDatePicker >= dayjs()) {
                setStartDate(startDatePicker);
                setEndDate(endDatePicker);
                sessionStorage.setItem("startDate", JSON.stringify(startDatePicker));
                sessionStorage.setItem("endDate", JSON.stringify(endDatePicker));
                window.location.reload();
            }
            else {
                sessionStorage.getItem("startDate") && sessionStorage.removeItem("startDate");
                sessionStorage.getItem("endDate") && sessionStorage.removeItem("endDate");
                window.location.reload();
            }
        }
    }

    return(
        <div style={{paddingTop:"2%"}}>
            <div style={{display:"block"}}>
                <Link to="/search"><btn className="btnNav" style={{display:"inline-flex", textDecoration:"none", width:"200px", height:"100px", paddingLeft:"2%", marginLeft:"0%", marginRight:"5%", padding:".5%"}}>Search again</btn></Link>
                <div style={{border:"1px solid black", borderRadius:"25px", display:"inline-flex", width:"650px", height:"90px", alignItems:"center", paddingLeft:"10px", paddingRight:"5px", background:"#D9D9D9"}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Start date"
                            value={startDatePicker}
                            onChange={(newValue) => setStartDatePicker(newValue)}
                        />
                        <p style={{width:"5px"}}></p>
                        <DatePicker
                            label="End date"
                            value={endDatePicker}
                            onChange={(newValue) => setEndDatePicker(newValue)}
                        />
                    </LocalizationProvider>
                    <btn className="btnNav" style={{marginLeft:"10%", paddingLeft:"5%"}} onClick={handleFilterClick}>Filter</btn>
                </div>
            <btn className="btnNav" onClick={showOffersOnly} style={{display:"inline-flex", width:"250px", height:"100px", marginLeft:"10%", padding:".5%", paddingLeft:"2%"}}>Show offers only</btn>
            </div>
            <h1 class="h1Title">Destinations for you</h1>
            <hr class="titleLine" style={{marginBottom:"50px", width:"auto", marginRight:"30%"}}></hr>
            <div class="gridDestinations">
                {existingDestinations && showDestinations}
            </div>
            <Link to="/home"><button class="btnNav" style={{marginTop:"5%", width:"auto", marginLeft: "0%", marginBottom:"5%"}}>Home</button></Link>
        </div>
    );
}