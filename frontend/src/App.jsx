import { useState } from "react";
import {  Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Home from "./pages/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import AppDownload from "./components/AppDownload/AppDownload.jsx";
import LoginPopup from "./components/LoginPopup/LoginPopup.jsx";
import Verify from "./pages/Verify/Verify.jsx";
import MyOrders from "./pages/MyOrders/MyOrders.jsx";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      
        {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
        <div className="app">
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/verify-payment" element={<Verify/>}/>
            <Route path="/myorders" element={<MyOrders/>}/>
          </Routes>
        </div>
        <AppDownload />
        <Footer />
      
    </>
  );
};

export default App;
