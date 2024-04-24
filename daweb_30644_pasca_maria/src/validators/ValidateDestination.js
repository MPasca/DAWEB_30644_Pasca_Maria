import dayjs from "dayjs";

export default function ValidateDestination(destination) {
    if(destination.location == null){
        console.error("No destination specified");
        return false;
    }

    if(destination.price <= 0){
        console.error("Incorrect price");
        return false;
    }

    if(destination.offer < 0){
        console.error("Incorrect offer");
        return false;
    }

    if(destination.noSeats <= 0){
        console.error("Incorrect number of seats");
        return false;
    }

    if(destination.description == null){
        console.error("No description provided");
        return false;
    }

    if(destination.img == null){
        console.error("No image provided");
        return false;
    }

    if(destination.startDate < dayjs()){
        console.error("Incorrect start date");
        return false;
    }
    
    if(destination.startDate >= destination.endDate){
        console.error("Incorrect date range");
        return false;
    }

    return true;
}