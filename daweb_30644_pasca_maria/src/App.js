import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Contact from './pages/Contact';
import Destinations from './pages/Destinations';
import Search from './pages/Search';

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
          <Route path="/search" element={<Search/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}