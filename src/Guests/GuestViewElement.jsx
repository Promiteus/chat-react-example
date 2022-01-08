import React from "react";
import {Card, CardContent, CardHeader, Grid, IconButton, Typography} from "@mui/material";

const GuestViewElement = ({visitorDetails}) => {

    return(
        <>
          <Grid item xs={12} sm={6} md={4}>
             <Card className="card-item card">
                 <CardHeader
                     action={
                         <IconButton aria-label="settings">

                         </IconButton>
                     }
                     title={`${visitorDetails?.firstName} ${visitorDetails?.lastName}`}
                     subheader={`Родился ${visitorDetails?.birthDate}`}
                 />
                 <CardContent>
                     <Typography variant="body2" color="text.secondary">
                         {visitorDetails?.aboutMe}
                     </Typography>
                 </CardContent>
             </Card>
          </Grid>
        </>
    );
}

export default GuestViewElement;