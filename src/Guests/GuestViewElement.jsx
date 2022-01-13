import React from "react";
import {Card, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography} from "@mui/material";
import {BASE_DATA_URL} from "../Stores/api/Common/ApiCommon";

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
                 <CardMedia
                     component="img"
                     height="194"
                     image={BASE_DATA_URL+visitorDetails?.thumbUrl}
                     alt="Paella dish"
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