import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import {useMutation} from "@apollo/client";
import { v4 as uuid } from "uuid";

import { ORDER_MUTATION } from "../utils/graphql";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({ openCart, setCartOpen, cartItems }) {

    const total = Object.keys(cartItems).reduce((acc, key) => {
        return acc + parseFloat(cartItems[key].quantity) * parseFloat(cartItems[key].price)
    }, 0).toFixed(2)

    const items = Object.keys(cartItems).map((key) => {
        return (
            {
                "name": cartItems[key].name,
                "quantity": cartItems[key].quantity
            }
        )
    })

    const orderInput = {
        "orderInput": {
            "items": items,
            "total": parseFloat(total),
            "userId": uuid()
        }
    }

    const [createOrder, { data, loading, error }] = useMutation(ORDER_MUTATION, {
        variables: orderInput
    });

    const handleClose = () => {
        setCartOpen(false);
    }

    const handleCheckout = () => {
        createOrder()
        setCartOpen(false);
    };

    return (
        <Box>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={openCart}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Shopping Cart
                </BootstrapDialogTitle>
                <DialogContent dividers sx={{ width: "500px", minHeight: "50px" }}>
                    {Object.keys(cartItems).length === 0 ?
                        <Typography gutterBottom variant="h6">
                            Your cart is empty
                        </Typography> :
                        <Typography gutterBottom>
                            {Object.keys(cartItems).map((key) => {
                                return (
                                    <Box key={key} sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography gutterBottom>
                                            {cartItems[key].name}
                                        </Typography>
                                        <Typography gutterBottom>
                                            {cartItems[key].quantity}
                                        </Typography>
                                    </Box>
                                )
                            })}
                            <Typography gutterBottom variant="h6">
                                Total: {total} Euros
                            </Typography>
                        </Typography>
                    }
                    <Typography gutterBottom>

                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCheckout}>
                        Checkout
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </Box>
    );
}
