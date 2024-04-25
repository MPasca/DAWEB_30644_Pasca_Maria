import './App.css';
import { BrowserRouter, Routes, Route, json} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Contact from './pages/Contact';
import Destinations from './pages/Destinations';
import Destination from './components/Destination';
import SearchLocation from './pages/SearchLocation';
import SearchDate from './pages/SearchDate';
import SearchPeople from './pages/SearchPeople';
import AgentDashboard from './pages/AgentDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import UpdateDestination from "./components/UpdateDestination";
import AddDestination from './components/AddDestination';

import { useEffect, useState } from 'react';



export default function App() {
  const [userLocation, setUserLocation] = useState();

  const getUserLocation = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({latitude, longitude});
      }, (error) => console.error('Error getting user location: ', error));
    }
    else {
      console.error("Geolocation not supported on this browser");
    }
  }

  useEffect(() => {
    userLocation && sessionStorage.setItem("userLocation", JSON.stringify(userLocation));
  }, [userLocation])

  const [existingDestinations, setExistingDestinations] = useState([]);
  useEffect(() => {
      fetch('http://localhost:8000/destinations', {
        method: 'GET',
        mode: 'cors',
        headers:{"Content-Type":"application/json"}
    }).then(response => response.json())
      .then(data => { setExistingDestinations(data); })
      .catch((error) => console.error('Error fetching data:', error));
  }, [])

  useEffect(() => {
    sessionStorage.setItem("existingDestinations", JSON.stringify(existingDestinations));
  }, [existingDestinations])

  const handleOfferClick = () => {
    localStorage.setItem("showOffers", true);
  }


  const handleLogoutbtn = () => {
    sessionStorage.clear();
    window.location.href = `http://localhost:3000`;
  }

  var role = sessionStorage.getItem("role")
  return (
    <div style={{padding:"0px", margin:"0px"}}>
      {getUserLocation()}
      <div class="dropdown">
        <button class="logo"/>
        <div class="dropdown-content">
          {role != "agent" && role != "client" && <a href="/login">Login</a>}

          {role == "client" && <a onClick={handleLogoutbtn}>Logout</a>}

          {role == "agent" && <a href="agentdashboard">Dashboard</a>}
          <a href="/home">Home</a>          
          <a href="/search">Search</a>
          <div class="subnav">
            <a class="subnavbtn" href="/destinations">Destinations</a>
            <div class="subnav-content">
              <a href="/destinations" onClick={handleOfferClick}>Offers</a>
            </div> 
          </div>
          <a href="/contact">Contact</a>
        </div>
      </div>

      <BrowserRouter>
        <Routes>
          <Route index element ={<Homepage/>}/>
          <Route path="/home" element ={<Homepage/>}/>
          <Route path="/login" element = {<Login/>}/>
          <Route path="/register" element = {<Register/>}/>
          <Route path="/contact" element = {<Contact/>}/>
          <Route path="/destinations" element = {<Destinations/>}/>
          <Route path="/search" element={<SearchLocation/>}/>
          <Route path="/search_location" element={<SearchLocation/>}/>
          <Route path="/search_date" element={<SearchDate/>}/>
          <Route path="/search_people" element={<SearchPeople/>}/>
          <Route path={`/destination/:id`} element={<Destination/>}/>
          <Route path={`/agentdashboard`} element={<AgentDashboard/>}/>
          <Route path="/update_destination" element={<UpdateDestination/>}/>
          <Route path="/add_destination" element={<AddDestination/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}