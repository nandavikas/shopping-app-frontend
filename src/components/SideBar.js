import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import React from "react";
import {useNavigate} from "react-router-dom";


export default function SideBar({open, setOpen}) {

    const navigate = useNavigate();

    return (<Drawer
        anchor={'left'}
        open={open}
        onClose={(event) => {
            setOpen(false)
        }}
    >
        <Box
            sx={{width: 250}}
            role="presentation"
            onClick={(event) => {
                setOpen(true)
            }}
        >
            <List>
                {['Vegetables', 'Fruits', 'Cheese'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => navigate(`/${text}`)}>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
        </Box>
    </Drawer>)
}
