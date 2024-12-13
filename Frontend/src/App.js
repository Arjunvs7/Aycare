
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Payment from './Pages/Payment';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import { Order } from './Pages/Order';
import Profile from './Pages/Profile';
function App() {
  return (
    <div>
      <BrowserRouter>
  
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}></Route>
      
        <Route path='/roots' element={<ShopCategory category="root"/>} ></Route> 
        <Route path='/seeds' element={<ShopCategory  category="Seed"/>}></Route>
        <Route path='/herbals' element={<ShopCategory category="Herbal"/>}></Route>
        <Route path="/product" element={<Product/>}>
         <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/login' element={<LoginSignup/>}></Route>
        <Route path='/Payment' element={<Payment/>}></Route>
        <Route path='/orders' element={<Order/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>



      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
