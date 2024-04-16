import dayjs from "dayjs";

export default function ValidateDestination(destination) {
    if(destination.location == null){
        throw Error("No destination specified");
    }
    if(destination.price <= 0){
        throw Error("Incorrect price");
    }
    if(destination.offer < 0){
        throw Error("Incorrect offer");
    }
    if(destination.noSeats <= 0){
        throw Error("Incorrect number of seats");
    }
    if(destination.description == null){
        throw Error("No description provided");
    }
    if(destination.img == null){
        throw Error("No image provided");
    }
    if(destination.startDate < dayjs()){
        throw Error("Incorrect start date");
    }
    if(destination.startDate >= destination.endDate){
        throw Error("Incorrect date range");
    }
    return true;
}