
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Shop } from './Pages/Shop';
import { Shopcategory } from './Pages/Shopcategory';
import { Product } from './Pages/Product';

import { LoginSignup } from './Pages/LoginSignup';
import { Fotter } from './Components/Footer/Fotter';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from  './Components/Assets/banner_women.png'
import kids_banner from './Components/Assets/banner_kids.png'
import { ShopContextProvider } from './Context/ShopContext';
import { Cartp } from './Pages/Cartp';










export default function App() {
  return (
    <div>
      <BrowserRouter>
      
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<Shopcategory banner={men_banner} category="men"/>}/>
        <Route path='/womens' element={<Shopcategory banner={women_banner} category="women"/>}/>
        <Route path='/kids' element={<Shopcategory banner={kids_banner} category="kid"/>}/>
        <Route path="/product/:productId" element={<Product />} />
         
         <Route path='/cartp' element={<Cartp/>}/>
         <Route path='/login' element={<LoginSignup/>}/>
         
         
         

      </Routes>
      <Fotter/>
      </BrowserRouter>
      
      
    </div>
  );
}


