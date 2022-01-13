import React from "react";
import {Box, Container, Grid, Paper, Typography} from "@mui/material";
import GuestViewElement from "./GuestViewElement";
import './index.css'

const GuestsView = ({visitors}) => {
    return (
        <div className="d-block m-1">
           <Container>
               {visitors?.length ?
                   <Grid container spacing={1}>
                       {visitors?.map(elem => (
                         <GuestViewElement visitorDetails={elem}/>
                       ))}
                   </Grid>
                   :
                   <Paper elevation={3} className="text-center">
                       <Typography variant="h5">У вас пока не было гостей</Typography>
                   </Paper>}
            </Container>
        </div>
    );
}

export default GuestsView;