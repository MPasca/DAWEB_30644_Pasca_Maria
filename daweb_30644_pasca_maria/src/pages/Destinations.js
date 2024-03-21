import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Destinations(){
    var chosenLocation = localStorage.getItem("location");
    var numberAdults = JSON.parse(localStorage.getItem("adults"));
    var numberChildren = JSON.parse(localStorage.getItem("children"));
    var startDate = JSON.parse(localStorage.getItem("startDate"));
    var endDate = JSON.parse(localStorage.getItem("endDate"));

    var existingDestinations = JSON.parse(localStorage.getItem("mocks"));

    const filterResult = () => {
        console.log("existingDestinations:" + existingDestinations);
        console.log("1st elem" + existingDestinations[0]);
        var result = existingDestinations;
        console.log("init result" + result);
        if(chosenLocation !== null){
            result = result.filter((destination) => destination.location === chosenLocation);
        } 
        console.log("after location filtering" + result);

        if(startDate !== null && endDate != null && startDate !== endDate){
            result = result.filter((destination) => destination.startDate >= startDate);
            result = result.filter((destination) => destination.endDate <= endDate);    
        }
        console.log("after date filtering" + result);

        if(numberAdults > 0){
            result = result.filter((destination) => destination.places > numberAdults + numberChildren);
            if(numberChildren > 0){
                result = result.filter((destination) => destination.childFriendly === true);
            }    
        }

        console.log("after number of goers filtering" + result);

        return result;
    }

    const [destinations, setDestinations] = useState(filterResult());

    const showDestinations = () => {
        return(
            <div >
                
            </div>
        );
    }
    return(
        <div>
            <h1 class="h1Title">Destinations for you</h1>
            <hr class="titleLine" style={{marginBottom:"50px"}}></hr>
            <div class="gridDestinations">
                <div class="divMinCard">
                    <p class="lblMinCard"> item </p>
                    <img className="imgMinCard" src="aveiro.png"/>
                    <btn class="btnMinCard">details</btn>
                </div>
                <div class="divMinCard">
                    <p class="lblMinCard"> item </p>
                    <img className="imgMinCard" src="aveiro.png"/>
                    <btn class="btnMinCard">details</btn>
                </div>
                <div class="divMinCard">
                    <p class="lblMinCard"> item </p>
                    <img className="imgMinCard" src="aveiro.png"/>
                    <btn class="btnMinCard">details</btn>
                </div>
                <div class="divMinCard">
                    <p class="lblMinCard"> item </p>
                    <img className="imgMinCard" src="aveiro.png"/>
                    <btn class="btnMinCard">details</btn>
                </div>
                <div class="divMinCard">
                    <p class="lblMinCard"> item </p>
                    <img className="imgMinCard" src="aveiro.png"/>
                    <btn class="btnMinCard">details</btn>
                </div>
                <div class="divMinCard">
                    <p class="lblMinCard"> item </p>
                    <img className="imgMinCard" src="aveiro.png"/>
                    <btn class="btnMinCard">details</btn>
                </div>
                <div class="divMinCard">
                    <p class="lblMinCard"> item </p>
                    <img className="imgMinCard" src="aveiro.png"/>
                    <btn class="btnMinCard">details</btn>
                </div>
                <div class="divMinCard">
                    <p class="lblMinCard"> item </p>
                    <img className="imgMinCard" src="aveiro.png"/>
                    <btn class="btnMinCard">details</btn>
                </div>
                <div class="divMinCard">
                    <p class="lblMinCard"> item </p>
                    <img className="imgMinCard" src="aveiro.png"/>
                    <btn class="btnMinCard">details</btn>
                </div>
            </div>
            <Link to="/home"><button class="btnNav" style={{marginTop:"5%", marginLeft: "0%"}}>Back</button></Link>
        </div>
    );
}