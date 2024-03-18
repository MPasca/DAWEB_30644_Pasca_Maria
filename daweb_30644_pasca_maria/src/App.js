import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Contact from './pages/Contact';
import Destinations from './pages/Destinations';
import SearchLocation from './pages/SearchLocation';
import SearchDate from './pages/SearchDate';
import SearchPeople from './pages/SearchPeople';

export default function App() {
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