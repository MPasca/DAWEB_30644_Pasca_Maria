import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
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


export default function App() {
  const handleOfferClick = () => {
    localStorage.setItem("showOffers", true);
  }

  var role = sessionStorage.getItem("role")
  return (
    <div style={{padding:"0px", margin:"0px"}}>
      <div class="dropdown">
        <button class="logo"/>
        <div class="dropdown-content">
          {role != "agent" && role != "client" && <a href="/login">Login</a>}
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