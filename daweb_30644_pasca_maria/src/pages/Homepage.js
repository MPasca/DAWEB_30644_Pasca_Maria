import { Link } from "react-router-dom";
import dayjs from 'dayjs';


export default function Homepage(){
    localStorage.setItem("chosenLocation", null);
    localStorage.setItem("adults", 0);
    localStorage.setItem("children", 0);
    localStorage.setItem("startDate", JSON.stringify(dayjs().format('YYYY-MM-DD')));
    localStorage.setItem("endDate", JSON.stringify(dayjs().format('YYYY-MM-DD')));
    localStorage.setItem("showOffers", false);
    localStorage.setItem("id", null);

    var mock1 ={
        id: 1,
        location: "Aveiro, Portugal",
        description: "Situated on the edge of an extensive coastal lagoon system, Aveiro is a prosperous town in Portugal that effortlessly blends history, culture, and natural beauty. With its good-looking center and youthful, energetic buzz, Aveiro has earned the moniker “The Venice of Portugal.”\nSo, if you want to relax and enjoy a cold Capirinha on the beach, you want to visit the historic treasures that reside here or admire the beautiful canals and moliceiros scattered around the city, Aveiro has it all.",
        noSeats: 30,
        price: 120,
        childFriendly: true,
        img: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/27/64/b9.jpg",
        startDate: new Date("2024-04-09"),
        endDate: new Date("2024-04-13"),
        offer: 10
      };
    
      var mock2 = {
        id: 2,
        location: "Berlin, Germany",
        description: "Situated on the edge of an extensive coastal lagoon system, Aveiro is a prosperous town in Portugal that effortlessly blends history, culture, and natural beauty. With its good-looking center and youthful, energetic buzz, Aveiro has earned the moniker “The Venice of Portugal.”\nSo, if you want to relax and enjoy a cold Capirinha on the beach, you want to visit the historic treasures that reside here or admire the beautiful canals and moliceiros scattered around the city, Aveiro has it all.",
        noSeats: 20,
        price: 250,
        childFriendly: false,
        img: "berlin.png",
        startDate: new Date("2024-04-09"),
        endDate: new Date("2024-04-13"),
        offer: 20
      };
    
      var mock3 = {
        id: 3,
        location: "Seattle, WA",
        description: "Situated on the edge of an extensive coastal lagoon system, Aveiro is a prosperous town in Portugal that effortlessly blends history, culture, and natural beauty. With its good-looking center and youthful, energetic buzz, Aveiro has earned the moniker “The Venice of Portugal.”\nSo, if you want to relax and enjoy a cold Capirinha on the beach, you want to visit the historic treasures that reside here or admire the beautiful canals and moliceiros scattered around the city, Aveiro has it all.",
        noSeats: 10,
        price: 400,
        childFriendly: false,
        img: "seattle.jpg",
        startDate: new Date("2024-05-09"),
        endDate: new Date("2024-06-13"),
        offer: 0
      };
    
      
    return(
          <div style={{display: "inline-flex", padding:"0px", margin:"0px"}}>
              <div style={{width:"80%", marginTop: "5%"}}>
                  <h1 class="h1Title">Where next?</h1>
                  <hr class="titleLine"/>
                  <h2 class="h2Title">Find your next destination</h2>
                  <Link to="/search"><btn class="btnTitle" style={{marginBottom:"10%"}}>Search here</btn></Link>
              </div>
              <img class="bgImage" src="seattle.jpg" style={{marginLeft:"30px"}}/>
          </div>
    );
}