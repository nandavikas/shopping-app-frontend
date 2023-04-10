import React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import {useQuery} from "@apollo/client";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import ArrowRight from "@mui/icons-material/ArrowRight";
import CircularProgress from "@mui/material/CircularProgress";

import MenuCard from "../../components/Card";
import { ITEMS_QUERY } from "../../utils/graphql";

export default function Cheese({ cartItems, setCartItems }) {

    const [pageNumber, setPageNumber] = React.useState(0);

    const {data, loading, error} = useQuery(ITEMS_QUERY, {
        variables: {category: "Fruit", pageNumber},
    });

    const onClickNext = () => {
        setPageNumber(pageNumber + 1);
    }

    const onClickPrevious = () => {
        if (pageNumber === 0) {
            return;
        }
        setPageNumber(pageNumber - 1);
    }

    if (loading) {
        return <CircularProgress color="secondary" />
    }

    return (
        <Box>
            <Typography variant={"h4"}
                        sx={{
                            color: "gray",
                            display: "flex",
                            justifyContent: "center",
                            // marginTop: "15px"
                        }}>Shop from wide-range of Cheese</Typography>
            <Grid container spacing={6}
                  sx={{marginTop: '10px', marginBottom: '50px'}}
                  justifyContent="center">
                {data && data.getItems.map((cheese) => {
                    return (
                        <Grid item s={2} key={cheese.name}>
                            <MenuCard price={cheese.price}
                                      name={cheese.item}
                                      image={cheese.image}
                                      stock={cheese.stock}
                                      description={cheese.description}
                                      cartItems={cartItems}
                                      setCartItems={setCartItems}
                            />
                        </Grid>
                    )
                })}
            </Grid>
            <Box sx={{ marginBottom: '25px', display: 'flex', justifyContent: 'center'}}>
                <Button onClick={onClickPrevious} variant="outlined" color="secondary" sx={{ width: '175px', color: '#a35a60' }}><ArrowLeft />Previous</Button>
                <Button onClick={onClickNext} variant="outlined" color="secondary" sx={{ width: '175px', color: '#a35a60' }}>Next<ArrowRight /></Button>
            </Box>
        </Box>
    )
}
