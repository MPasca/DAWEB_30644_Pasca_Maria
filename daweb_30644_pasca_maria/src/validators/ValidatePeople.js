export default function ValidatePeople (noAdults, noChildren){
    if(noAdults < 0 || noChildren < 0){
        console.error("Number of goers cannot be negative");
        return false;
    }
    if(noAdults === 0 && noChildren !== 0){
        console.error("No number of adults specified");
        return false;
    }
    
    var sum = parseInt(noAdults) + parseInt(noChildren);
    if(sum > 8){
        console.error("Too many people");
        return false;
    }

    if(noChildren/noAdults > 3){
        console.error("An adult should look over maximum 3 children");
        return false;
    }

    return true;
}