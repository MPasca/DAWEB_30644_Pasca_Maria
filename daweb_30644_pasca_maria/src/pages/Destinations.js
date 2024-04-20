import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import dayjs, { Dayjs } from 'dayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createFilterOptions } from "@mui/material";

export default function Destinations(){

    var chosenLocation = localStorage.getItem("chosenLocation");
    var numberAdults = JSON.parse(localStorage.getItem("adults"));
    var numberChildren = JSON.parse(localStorage.getItem("children"));
    var storageStartDate = JSON.parse(localStorage.getItem("startDate"));
    var storageEndDate = JSON.parse(localStorage.getItem("endDate"));

    var onlyOffers = JSON.parse(localStorage.getItem("showOffers"));
    var existingDestinations = JSON.parse(localStorage.getItem("mocks"));

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

        if(chosenLocation !== 'null'){
            result = result.filter((destination) => destination.location === chosenLocation);
        } 

        if(startDate !== null && endDate !== null && startDate !== endDate){
            result = result.filter((destination) => destination.startDate >= startDate);
            result = result.filter((destination) => destination.endDate <= endDate);    
        }
        if(numberChildren > 0){
            result = result.filter((destination) => destination.childFriendly === true);
        }

        result = result.filter((destination) => numberChildren + numberAdults < destination.noSeats);

        return result;
    }

    const [destinations, setDestinations] = useState(filterResult());

    const showDestinations = destinations.map((destination) => {
        console.log(JSON.parse(destination.id));
        return(
            (!showOffers || (showOffers && destination.offer != 0)) &&
            <div class="divMinCard">
                <p class="lblMinCard">{destination.location}</p>
                {destination.offer != 0 && <div>
                    <img className="imgMinCard" src={destination.img} style={{marginBottom:"0px"}}/>
                 <p class="lblMinCard" style={{marginTop:"5px", padding:"0px"}}>SPECIAL OFFER: 10% OFF</p>
                </div>}
                {destination.offer == 0 && <img className="imgMinCard" src={destination.img}/>}
                <Link to={`/destination/${destination.id}`}><btn class="btnMinCard" style={{marginTop:"10px"}}>Details</btn></Link>
            </div>
        );
    });

    const handleFilterClick = () => {
        console.log("in filter");
        if(startDatePicker <= endDatePicker) {
            console.log("start date < end date")
            if(startDatePicker >= dayjs()) {
                setStartDate(startDatePicker);
                setEndDate(endDatePicker);
                localStorage.setItem("startDate", JSON.stringify(startDatePicker));
                localStorage.setItem("endDate", JSON.stringify(endDatePicker));
                console.log(startDatePicker + " " + startDate);
                console.log(endDatePicker + " " + endDate);
                window.location.reload();
            }
        }
    }

    return(
        <div style={{paddingTop:"2%"}}>
            <div style={{display:"block"}}>
                <Link to="/search"><btn className="btnNav" style={{display:"inline-flex", textDecoration:"none", width:"200px", height:"100px", paddingLeft:"2%", marginLeft:"0%", marginRight:"5%", padding:".5%"}}>Search again</btn></Link>
                <div style={{border:"1px solid black", borderRadius:"20%", display:"inline-flex", width:"650px", height:"90px", alignItems:"center", paddingLeft:"10px", paddingRight:"5px", background:"#D9D9D9"}}>
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
                {showDestinations}
            </div>
            <Link to="/home"><button class="btnNav" style={{marginTop:"5%", width:"auto", marginLeft: "0%", marginBottom:"5%"}}>Back home</button></Link>
        </div>
    );
}