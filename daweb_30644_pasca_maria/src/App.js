import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Contact from './pages/Contact';
import Destinations from './pages/Destinations';
import Search from './pages/Search';

export default function App() {
  return (
    <div>
        <nav>
            <button class="hamburgerMenu" data-toggle="collapse" data-target="#menuCollapsed"/>
        </nav>

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