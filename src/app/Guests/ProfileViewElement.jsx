import React from "react";
import {Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography} from "@mui/material";
import {BASE_DATA_URL} from "../Stores/api/Common/ApiCommon";
import {ChatFillSvg, HeartFillSvg} from "../Svg";

const ProfileViewElement = ({profile}) => {

    return(
        <>
          <Grid item xs={12} sm={6} md={3} >
             <Card className="card-item card grid-element">
                 <CardHeader
                     action={
                         <IconButton aria-label="settings">

                         </IconButton>
                     }
                     title={`${profile?.firstName} ${profile?.lastName}`}
                     subheader={`Родился ${profile?.birthDate}`}
                 />
                 <CardMedia
                     component="img"
                     height="194"
                     image={BASE_DATA_URL+profile?.thumbUrl}
                     alt="Paella dish"
                     onClick={() => {}}
                     sx = {{padding: 1}}
                 />
                 <CardActions>
                     <IconButton aria-label="talk with person">
                         <ChatFillSvg color="orange"/>
                     </IconButton>
                     <IconButton aria-label="like person">
                         <HeartFillSvg color="red"/>
                     </IconButton>
                 </CardActions>
             </Card>
          </Grid>
        </>
    );
}

export default ProfileViewElement;