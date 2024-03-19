import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Contact from './pages/Contact';
import Destinations from './pages/Destinations';
import SearchLocation from './pages/SearchLocation';
import SearchDate from './pages/SearchDate';
import SearchPeople from './pages/SearchPeople';

export default function App() {
  var mock1 ={
    id: 1,
    location: "Aveiro, Portugal",
    description: "Situated on the edge of an extensive coastal lagoon system, Aveiro is a prosperous town in Portugal that effortlessly blends history, culture, and natural beauty. With its good-looking center and youthful, energetic buzz, Aveiro has earned the moniker “The Venice of Portugal.”\nSo, if you want to relax and enjoy a cold Capirinha on the beach, you want to visit the historic treasures that reside here or admire the beautiful canals and moliceiros scattered around the city, Aveiro has it all.",
    noSeats: 30,
    price: 120,
    childFriendly: true,
    img: "aveiro.png",
    startDate: new Date("2024-04-09"),
    startDate: new Date("2024-04-13")
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
    startDate: new Date("2024-04-13")
  };

  var mock3 = {
    id: 3,
    location: "Seattle, WA",
    description: "Situated on the edge of an extensive coastal lagoon system, Aveiro is a prosperous town in Portugal that effortlessly blends history, culture, and natural beauty. With its good-looking center and youthful, energetic buzz, Aveiro has earned the moniker “The Venice of Portugal.”\nSo, if you want to relax and enjoy a cold Capirinha on the beach, you want to visit the historic treasures that reside here or admire the beautiful canals and moliceiros scattered around the city, Aveiro has it all.",
    noSeats: 10,
    price: 400,
    childFriendly: false,
    img: "seattle.jpg",
    startDate: new Date("2024-04-09"),
    startDate: new Date("2024-04-13")
  };

  var mocks = [mock1, mock2, mock3]
  localStorage.setItem("mocks", JSON.stringify(mocks));

  return (
    <div>
      <div class="dropdown">
        <button class="logo"/>
        <div class="dropdown-content">
          <a href="/home">Login</a>
          <a href="/home">Home</a>
          <a href="/search">Search</a>
          <a href="/destinations">Destinations</a>
          <a href="/contact">Contact</a>
        </div>
      </div>

      <BrowserRouter>
        <Routes>
          <Route index element ={<Homepage/>}/>
          <Route path="/home" element ={<Homepage/>}/>
          <Route path="/contact" element = {<Contact/>}/>
          <Route path="/destinations" element = {<Destinations/>}/>
          <Route path="/search" element={<SearchLocation/>}/>
          <Route path="/search_location" element={<SearchLocation/>}/>
          <Route path="/search_date" element={<SearchDate/>}/>
          <Route path="/search_people" element={<SearchPeople/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}