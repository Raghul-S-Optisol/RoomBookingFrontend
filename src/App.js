import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login-signup/Login';
import Signup from './components/Login-signup/Signup';
import Welcome from './components/Login-signup/Welcome';
import Admin from './components/Login-signup/Admin';
import Locations from './components/Locations/Locations';
import AdminLocations from './components/Locations/AdminLocations';
import AdminRooms from './components/Locations/AdminRooms';


function App() {
  return ( 
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Welcome />}></Route>
            <Route path='/Login' element={<Login />}></Route>
            <Route path='/Signup' element={< Signup/>}></Route>
            <Route path='/Admin' element={< Admin/>}></Route>
            <Route path='/Locations' element={< Locations />}></Route>
            <Route path='/AdminLocations' element={< AdminLocations />}></Route>
            <Route path='/AdminRooms/:location' element={< AdminRooms />}></Route>
        </Routes>
      
    </BrowserRouter>
         

  );
}

export default App;
