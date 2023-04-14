import * as React from 'react';
import {useMutation} from "@apollo/client";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import {v4 as uuid} from "uuid";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import Snackbar from '@mui/material/Snackbar';
import Alert from "@mui/material/Alert";

import {ORDER_MUTATION} from "../utils/graphql";
import ButtonGroup from "@mui/material/ButtonGroup";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
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
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function Cart({openCart, setCartOpen, cartItems, setCartItems}) {

    const [enableEdit, setEnableEdit] = React.useState({});
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

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

    const [createOrder, {data, loading, error}] = useMutation(ORDER_MUTATION, {
        variables: orderInput
    });

    const handleClose = () => {
        setCartOpen(false);
    }

    const handleCheckout = () => {
        createOrder()
        setOpenSnackbar(true);
        setEnableEdit({})
        setCartItems({});
        setCartOpen(false);
    };

    const incrementItem = (key) => {
        const newCartItems = {...cartItems};
        newCartItems[key].quantity = newCartItems[key].quantity + 1;
        setCartItems(newCartItems);
    }

    const decrementItem = (key) => {
        const newCartItems = {...cartItems};
        newCartItems[key].quantity = newCartItems[key].quantity - 1;
        setCartItems(newCartItems);
    }

    const deleteItem = (key) => {
        const newCartItems = {...cartItems};
        delete newCartItems[key];
        setCartItems(newCartItems);
    }

    const editItems = (key) => {
        setEnableEdit({[key]: true});
    }

    const saveNewValue = (key, value) => {
        setEnableEdit({});
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false );
    };

    return (
        <Box>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                message="Order Placed Successfully!"
                key={"top-center"}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Order placed successfully. We have sent a confirmation to your registered mobile number!
                </Alert>
            </Snackbar>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={openCart}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Shopping Cart
                </BootstrapDialogTitle>
                <DialogContent dividers sx={{width: "500px", minHeight: "50px"}}>
                    {Object.keys(cartItems).length === 0 ?
                        <Typography gutterBottom variant="h6">
                            Your cart is empty
                        </Typography> :
                        <Typography gutterBottom>
                            {Object.keys(cartItems).map((key) => {
                                return (
                                    <Box key={key} sx={{display: "flex", justifyContent: "space-between"}}>
                                        <Typography gutterBottom key={key}>
                                            {cartItems[key].name}:
                                            {enableEdit[key] ? <ButtonGroup sx={{width: '20px', height: '20px', marginLeft: '20px'}}>
                                                    <Button onClick={(e) => { decrementItem(key) }}>-</Button>
                                                    <Button>{cartItems[key].quantity}</Button>
                                                    <Button onClick={(e) => { incrementItem(key) }}>+</Button>
                                                    <Button onClick={(e) => {
                                                        saveNewValue()
                                                    }}><CheckIcon/></Button>
                                                </ButtonGroup>
                                                : cartItems[key].quantity}
                                        </Typography>
                                        <ButtonGroup sx={{marginLeft: "15px"}} key={key}>
                                            <EditIcon key={`edit-${key}`} onClick={(e) => {
                                                editItems(key)
                                            }}/>
                                            <DeleteOutlineIcon key={`delete-${key}`} onClick={(e) => {
                                                deleteItem(key)
                                            }}/>
                                        </ButtonGroup>
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
