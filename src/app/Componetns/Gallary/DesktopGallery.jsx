import React, {useEffect, useState} from "react";
import {BASE_DATA_URL} from "../../Stores/api/Common/ApiCommon";
import {Card, CardMedia, Divider, Grid, ImageList, ImageListItem, Typography} from "@mui/material";
import {defineSelectedUser, setPageIndex} from "../../Stores/slices/CommonSlice";



/**
 * ProfileDetail profile:
 * {
 * "id":"200",
 * ...
 * "imgUrls":[
 * "/api/resource?user_id=200&file_id=ford_mustang_ford_avtomobil_226678_1280x1024.jpg",
 * "/api/resource?user_id=200&file_id=Снимок экрана от 2021-10-12 14-22-20.png",
 * "/api/resource?user_id=200&file_id=Снимок экрана от 2021-10-07 11-47-49.png"
 * ],"thumbUrl":"/api/resource/thumb?user_id=200"
 * }
 *
 * */

const DesktopGallery = ({profile}) => {
    const [isOpen, setOpen] = useState();

    function getFullUrls() {
        return (profile?.imgUrls?.length > 0) ? profile?.imgUrls.map(elem => (`${BASE_DATA_URL}${elem}`)) : [];
    }

    return(
        <div className="w-100 my-2">
            <Typography variant="h5" className="mx-2">Мои фото</Typography>
            <div className="d-flex justify-content-center my-2 w-100">
                <div>
                    <Grid container>
                        {getFullUrls().map((item) => (
                            <Grid item xs={12} sm={6} md={4}>
                                <Card className="card m-1">
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={item}
                                        alt="Paella dish"
                                        sx = {{padding: 1}}
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
            <Divider/>
        </div>

    )
}

export default DesktopGallery;