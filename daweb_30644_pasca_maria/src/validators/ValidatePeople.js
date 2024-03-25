export default function ValidatePeople (noAdults, noChildren){
    if(noAdults < 0 || noChildren < 0){
        console.log("number of adults: " + noAdults);
        console.log("number of children: " + noChildren);
        throw Error("Number of goers cannot be negative");
    }
    if(noAdults === 0 && noChildren !== 0){
        console.log("number of adults: " + noAdults);
        console.log("number of children: " + noChildren);
        throw Error("No number of adults specified")
    }
    var sum = parseInt(noAdults) + parseInt(noChildren);
    if(sum > 8){
        console.log("number of adults: " + noAdults);
        console.log("number of children: " + noChildren);
        throw Error("Too many people");
    }
    if(noChildren/noAdults > 3){
        console.log("number of adults: " + noAdults);
        console.log("number of children: " + noChildren);
        throw Error("An adult should look over maximum 3 children");
    }

    return true;
}