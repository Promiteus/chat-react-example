import React, {useEffect, useState} from "react";
import {BASE_DATA_URL} from "../../Stores/api/Common/ApiCommon";
import {Button, Card, CardMedia, Grid, IconButton, Typography} from "@mui/material";
import Viewer from 'react-viewer';
import {
    Block,
    ChatTwoTone,
    ChildCare, Face, FamilyRestroom,
    Group,
    Kitesurfing, Mode,
    Mood,
    Person,
    PhotoCamera,
    RoundaboutLeft,
    ModeEdit,
} from "@mui/icons-material";
import RoundSubstrate from '../../Svg/Sunstrate/RoundSubstrate';
import IconSubTitle from "../Header/IconSubTitle";
import {
    CAPTION_COMPLAIN, CAPTION_SAVE,
    CAPTION_WRITE, MSG_NO, MSG_YES,
    SUBTITLE_ABOUT_ME, SUBTITLE_CHILDS, SUBTITLE_FAMILY_STATUS, SUBTITLE_HOBBIES,
    SUBTITLE_MY_PHOTOS, SUBTITLE_SEX,
    SUBTITLE_SEX_ORIENTATION,
    SUBTITLE_WHOM_LOOKING_FOR
} from "../../Constants/TextMessagesRu";
import {dateDiffYears} from "../DateHandlers";


const ActionButtons = ({isEdit}) => {
    return (
      <div>
          {!isEdit &&
          <div className="d-flex flex-row justify-content-center align-content-center">
              <Button variant={"outlined"} startIcon={<ChatTwoTone/>} className="mx-1">
                  <Typography variant={"subtitle1"}>{CAPTION_WRITE}</Typography>
              </Button>
              <Button variant={"outlined"} color={"error"} startIcon={<Block/>} className="mx-1">
                  <Typography variant={"subtitle1"}>{CAPTION_COMPLAIN}</Typography>
              </Button>
          </div>}
      </div>
    );
}

const ActionSave = ({isEdit}) => {
    return (
        <div>
            {isEdit &&
            <div className="d-flex flex-row justify-content-center align-content-center">
                <Button variant={"outlined"} startIcon={<ChatTwoTone/>} className="mx-1">
                    <Typography variant={"subtitle1"}>{CAPTION_SAVE}</Typography>
                </Button>
            </div>}
        </div>
    );
}

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

const DesktopGallery = ({profile, isEdit}) => {
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
        <div className="w-100 my-2 px-4 py-2">
            <div>
                <Viewer
                    visible={visible}
                    onClose={() => { setVisible(false); } }
                    images={getFullUrls()}
                    noFooter={true}
                    activeIndex={imageIndex}
                />
            </div>
            <ActionButtons isEdit={isEdit}/>
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
                <div className="d-flex flex-row justify-content-start align-items-center">
                    <IconSubTitle text={SUBTITLE_HOBBIES} icon={<Kitesurfing />}/>
                    {isEdit &&
                    <IconButton onClick={() => {}}>
                        <ModeEdit/>
                    </IconButton>}
                </div>
                <div className="mx-2 text-success">{<Typography variant={"h6"}>{'Гетеро'}</Typography>}</div>

            </div>
            <div className="d-flex flex-column my-4">
                <div className="d-flex flex-row justify-content-start align-items-center">
                    <IconSubTitle text={SUBTITLE_WHOM_LOOKING_FOR} icon={<Group />}/>
                    {isEdit &&
                    <IconButton onClick={() => {}}>
                        <ModeEdit/>
                    </IconButton>}
                </div>
                <div className="mx-2 text-success">{<Typography variant={"h6"}>{profile?.aboutMe}</Typography>}</div>
            </div>
            <div className="d-flex flex-column my-4">
                <div className="d-flex flex-row justify-content-start align-items-center">
                    <IconSubTitle text={SUBTITLE_ABOUT_ME} icon={<Mood />}/>
                    {isEdit &&
                    <IconButton onClick={() => {}}>
                        <ModeEdit/>
                    </IconButton>}
                </div>
                <div className="mx-2 text-success">{<Typography variant={"h6"}>{profile?.aboutMe}</Typography>}</div>
            </div>
            <div className="d-flex flex-column my-4">
                <div className="d-flex flex-row justify-content-start align-items-center">
                    <IconSubTitle text={SUBTITLE_SEX_ORIENTATION} icon={<RoundaboutLeft />}/>
                    {isEdit &&
                    <IconButton onClick={() => {}}>
                        <ModeEdit/>
                    </IconButton>}
                </div>
                <div className="mx-2 text-success">{<Typography variant={"h6"}>{profile?.sexOrientation}</Typography>}</div>
            </div>
            <div className="d-flex flex-column my-4">
                <IconSubTitle text={SUBTITLE_SEX} icon={<Face />}/>
                <div className="mx-2 text-success">{<Typography variant={"h6"}>{profile?.sex}</Typography>}</div>
            </div>
            <div className="d-flex flex-column my-4">
                <div className="d-flex flex-row justify-content-start align-items-center">
                    <IconSubTitle text={SUBTITLE_CHILDS} icon={<ChildCare />}/>
                    {isEdit &&
                    <IconButton onClick={() => {}}>
                        <ModeEdit/>
                    </IconButton>}
                </div>
                <div className="mx-2 text-success">{<Typography variant={"h6"}>{profile?.kids === 0 ? {MSG_NO} : `${MSG_YES} - ${profile?.kids}` }</Typography>}</div>
            </div>
            <div className="d-flex flex-column my-4">
                <div className="d-flex flex-row justify-content-start align-items-center">
                    <IconSubTitle text={SUBTITLE_FAMILY_STATUS} icon={<FamilyRestroom />}/>
                    {isEdit &&
                    <IconButton onClick={() => {}}>
                        <ModeEdit/>
                    </IconButton>}
                </div>
                <div className="mx-2 text-success">{<Typography variant={"h6"}>{profile?.familyStatus}</Typography>}</div>
            </div>
            <ActionButtons isEdit={isEdit}/>
            <ActionSave isEdit={isEdit}/>
            <div className="p-4"></div>
        </div>
    )
}

export default DesktopGallery;