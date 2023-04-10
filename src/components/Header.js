import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import nanda from "../assets/nanda.jpg";

export default function Header({ handleMenuClick, setCartOpen }) {

    const handleCartClick = (event) => {
        setCartOpen(true);
    }

    return (
        <AppBar position="static" sx={{color: 'white', backgroundColor: '#52363e'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon onClick={handleMenuClick}/>
                    </IconButton>
                    <img src="https://www.jacando.com/wp-content/uploads/2021/01/jacando_logo_neg.png"
                         style={{width: '145px', height: '35px'}}/>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}/>
                    <ShoppingCartIcon sx={{marginRight: '20px'}} onClick={handleCartClick}/>
                    <Box sx={{flexGrow: 0}}>
                        <IconButton sx={{p: 0}}>
                            <Avatar alt="Nanda" src={nanda}/>
                        </IconButton>
                        <Typography variant="caption" sx={{marginLeft: '5px'}}>Nanda Vikas</Typography>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>)
}
