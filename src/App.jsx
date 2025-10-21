import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Restaurant from "./pages/Restaurant"
import Cart from "./pages/Cart"
import './App.css'
import { data } from "./data/restaurants";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [restaurants, setRestaurants] = useState(data);
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState({ subTotal: 0, vat: 0, total: 0, });

  return (
    <div className="">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar cart={cart} />
        <Routes>
          <Route path="/zomato-clone" element={
            <Home restaurants={restaurants} setRestaurants={setRestaurants} />
          } />

          <Route path="/restaurant/:id" element={
            <Restaurant restaurants={restaurants} setCart={setCart} cart={cart} />
          } />

          <Route path="/cart" element={
            <Cart cart={cart} setCart={setCart} price={price} setPrice={setPrice} />
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
