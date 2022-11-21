import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Payment from "../pages/Payment";
import Checking from "../pages/Checking";
import Register from "../pages/SignUp";
import Profile from "../pages/Profile";
import Login from "../pages/Login";  

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route> 
        <Route path="profile" element={<Profile ></Profile>}></Route>
        <Route path="register" element={<Register />}></Route> 
        <Route path="payment" element={<Payment />}></Route> 
        <Route path="checking" element={<Checking />}></Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
