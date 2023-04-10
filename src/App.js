import React, {useState} from 'react';
import Box from '@mui/material/Box';
import {BrowserRouter, Route, Router, Routes, useNavigate} from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Vegetables from "./pages/products/vegetables";
import Fruits from "./pages/products/fruits";
import Cheese from "./pages/products/cheese";
import CustomizedDialogs from "./components/Cart";

function ResponsiveAppBar() {

    const [open, setOpen] = useState(false);
    const [openCart, setCartOpen] = React.useState(false);
    const [cartItems, setCartItems] = useState({});

    const handleMenuClick = (event) => {
        setOpen(true);
    }

    return (
    <BrowserRouter>
        <Box sx={{flexGrow: 1}}>
            {open && <SideBar open={open} setOpen={setOpen}/>}
            <Header handleMenuClick={handleMenuClick} setCartOpen={setCartOpen} />
            <CustomizedDialogs openCart={openCart} setCartOpen={setCartOpen} cartItems={cartItems} />
        </Box>
        <Routes>
            <Route path="/" element={<Vegetables cartItems={cartItems} setCartItems={setCartItems}/>} />
            <Route index path="vegetables" element={<Vegetables cartItems={cartItems} setCartItems={setCartItems}/>}/>
            <Route path="fruits" element={<Fruits cartItems={cartItems} setCartItems={setCartItems}/>}/>
            <Route path="cheese" element={<Cheese cartItems={cartItems} setCartItems={setCartItems}/>}/>
        </Routes>
    </BrowserRouter>
    );
}

export default ResponsiveAppBar;
