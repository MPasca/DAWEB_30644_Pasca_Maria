import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Contact from './pages/Contact';
import Destinations from './pages/Destinations';
import Destination from './components/Destination';
import SearchLocation from './pages/SearchLocation';
import SearchDate from './pages/SearchDate';
import SearchPeople from './pages/SearchPeople';

export default function App() {
  const handleOfferClick = () => {
    localStorage.setItem("showOffers", true);
  }

  return (
    <div>
      <div class="dropdown">
        <button class="logo"/>
        <div class="dropdown-content">
          <a href="/home">Login</a>
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
          <Route path="/contact" element = {<Contact/>}/>
          <Route path="/destinations" element = {<Destinations/>}/>
          <Route path="/search" element={<SearchLocation/>}/>
          <Route path="/search_location" element={<SearchLocation/>}/>
          <Route path="/search_date" element={<SearchDate/>}/>
          <Route path="/search_people" element={<SearchPeople/>}/>
          <Route path="/destination" element={<Destination/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}