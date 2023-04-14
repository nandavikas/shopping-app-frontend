import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonGroup from "@mui/material/ButtonGroup";

export default function MenuCard({name, description, image, price, stock, cartItems, setCartItems }) {

    const onClickAdd = () => {
        if (cartItems[name]) {
            cartItems[name].quantity += 1;
            setCartItems({...cartItems})
            return;
        }
        else {
            const item = {
                name,
                price,
                stock,
                quantity: 1
            }
            setCartItems({...cartItems, [name]: item});
        }
    }

    const onClickRemove = () => {
        if (cartItems[name]) {
            if (cartItems[name].quantity === 1) {
                delete cartItems[name];
                setCartItems({...cartItems});
                return;
            }
            cartItems[name].quantity -= 1;
            setCartItems({...cartItems});
            return;
        }
    }

    const quantity = cartItems[name] ? cartItems[name].quantity : 0;

    return (
        <Card sx={{minWidth: 425, maxWidth: 425, maxHeight: 500, minHeight: 500}}>
            <CardMedia
                sx={{height: 140}}
                image={image}
                title={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h6">
                    {name}
                </Typography>
                <Typography sx={{ marginBottom: "15px" }} gutterBottom variant="body1">
                    {description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                    Stock: {stock}
                </Typography>
                <Typography variant="body2" color="text.secondary"sx={{ textAlign: "center" }}>
                    Price: {price}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
                <ButtonGroup color='primary' variant='outlined'>
                    <Button size="small" color={"secondary"} onClick={onClickRemove}>-</Button>
                    <Button size="medium" sx={{ backgroundColor: "#52363e",
                        color: "white",
                        ":hover": { backgroundColor: "#a35a60", color: "white" }
                    }}>Added to Cart: {quantity}</Button>
                    <Button size="small" color={"secondary"} onClick={onClickAdd}>+</Button>
                </ButtonGroup>
            </CardActions>
        </Card>
    );
}
