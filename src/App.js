import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Box from '@mui/material/Box';

import SideBar from "./components/SideBar";
import Header from "./components/Header";
import CustomizedDialogs from "./components/Cart";
import Product from "./pages/products";
import {PAGE_CATEGORY_MAPPING} from "./constants";

function AppBar() {

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
            <CustomizedDialogs openCart={openCart} setCartOpen={setCartOpen} cartItems={cartItems} setCartItems={setCartItems}/>
        </Box>
        <Routes>
            <Route path="/" element={<Product cartItems={cartItems} setCartItems={setCartItems} category={'Vegetable'} pageName={'vegetables'}/>} />
            {
                Object.keys(PAGE_CATEGORY_MAPPING).map((page) => {
                    return (
                        <Route path={page} element={<Product cartItems={cartItems} setCartItems={setCartItems} category={PAGE_CATEGORY_MAPPING[page]} pageName={page}/>} />
                    )
                })
            }
        </Routes>
    </BrowserRouter>
    );
}

export default AppBar;
