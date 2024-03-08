import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Contact from './pages/Contact';
import Destinations from './pages/Destinations';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element ={<Homepage/>}/>
          <Route path="/home" element ={<Homepage/>}/>
          <Route path="/contact" element = {<Contact/>}/>
          <Route path="/destinations" element = {<Destinations/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}