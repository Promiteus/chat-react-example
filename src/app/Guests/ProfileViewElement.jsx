import React from "react";
import {Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography} from "@mui/material";
import {BASE_DATA_URL} from "../Stores/api/Common/ApiCommon";
import {ChatFillSvg, HeartFillSvg} from "../Svg";
import {useNavigate} from "react-router-dom";
import {ROUTE_PROFILE} from "../Constants/Routes";
import {useDispatch} from "react-redux";
import {setPageIndex} from "../Stores/slices/CommonSlice";


const ProfileViewElement = ({profile}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                     onClick={() => {dispatch(setPageIndex(1))}}
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