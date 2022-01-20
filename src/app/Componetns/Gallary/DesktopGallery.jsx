import React, {useEffect, useState} from "react";
import {BASE_DATA_URL} from "../../Stores/api/Common/ApiCommon";
import {Card, CardMedia, Divider, Grid, ImageList, ImageListItem, Typography} from "@mui/material";
import Viewer from 'react-viewer';
import {Group, Kitesurfing, Mood, Person, PhotoCamera, RoundaboutLeft} from "@mui/icons-material";
import RoundSubstrate from '../../Svg/Sunstrate/RoundSubstrate';
import IconSubTitle from "../Header/IconSubTitle";
import {
    SUBTITLE_ABOUT_ME, SUBTITLE_HOBBIES,
    SUBTITLE_MY_PHOTOS,
    SUBTITLE_SEX_ORIENTATION,
    SUBTITLE_WHOM_LOFING_FOR
} from "../../Constants/TextMessagesRu";
import {dateDiffYears} from "../DateHandlers";


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
    const [visible, setVisible] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    function getFullUrls() {
        return (profile?.imgUrls?.length > 0) ?
            profile?.imgUrls.map(elem => ({src: `${BASE_DATA_URL}${elem}`, alt: ''})) :
            [{src: '', name: ''}];
    }

    function showImagePreview(index) {
        setVisible(true);
        setImageIndex(index);
    }

    return(
        <div className="w-100 my-2 p-4">
            <div>
                <Viewer
                    visible={visible}
                    onClose={() => { setVisible(false); } }
                    images={getFullUrls()}
                    noFooter={true}
                    activeIndex={imageIndex}
                />
            </div>

            <div className="d-flex flex-row justify-content-start align-items-center my-4">
                <RoundSubstrate children={<Person />} color={"orange"}/>
                <div className="mx-2 text-success">{<Typography variant={"h4"}>{`${profile?.firstName} ${profile?.lastName}, ${dateDiffYears(profile?.birthDate, new Date().toDateString())}`}</Typography>}</div>
            </div>
            <div className="d-flex flex-row justify-content-start align-items-center">
                <IconSubTitle text={SUBTITLE_MY_PHOTOS} icon={<PhotoCamera />}/>
            </div>
            <div className="d-flex justify-content-start my-2 w-100">
                <div>
                    <Grid container>
                        {getFullUrls().map((item, key) => (
                            <Grid item xs={12} sm={4} md={4}>
                                <Card className="card m-1">
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={item.src}
                                        alt="Paella dish"
                                        sx = {{padding: 1}}
                                        onClick={() => showImagePreview(key)}
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
            <div className="d-flex flex-column my-4">
                <IconSubTitle text={SUBTITLE_HOBBIES} icon={<Kitesurfing />}/>
                <div className="mx-2 text-success">{<Typography variant={"h6"}>{'Гетеро'}</Typography>}</div>
            </div>
            <div className="d-flex flex-column my-4">
                <IconSubTitle text={SUBTITLE_WHOM_LOFING_FOR} icon={<Group />}/>
                <div className="mx-2 text-success">{<Typography variant={"h6"}>{profile?.aboutMe}</Typography>}</div>
            </div>
            <div className="d-flex flex-column my-4">
                <IconSubTitle text={SUBTITLE_ABOUT_ME} icon={<Mood />}/>
                <div className="mx-2 text-success">{<Typography variant={"h6"}>{profile?.aboutMe}</Typography>}</div>
            </div>
            <div className="d-flex flex-column my-4">
                <IconSubTitle text={SUBTITLE_SEX_ORIENTATION} icon={<RoundaboutLeft />}/>
                <div className="mx-2 text-success">{<Typography variant={"h6"}>{'Гетеро'}</Typography>}</div>
            </div>
            <div className="p-4"></div>
        </div>
    )
}

export default DesktopGallery;