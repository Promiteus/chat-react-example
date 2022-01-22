import React, {useEffect, useState} from "react";
import {BASE_DATA_URL} from "../../Stores/api/Common/ApiCommon";
import {
    Button,
    Card,
    CardMedia,
    FormControl,
    Grid,
    IconButton, InputLabel, MenuItem, Select,
    TextareaAutosize,
    TextField,
    Typography
} from "@mui/material";
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
    CAPTION_WRITE, FAMILY_STATUS_DATA, KIDS_DATA, MSG_NO, MSG_YES, SEX_DATA, SEX_ORIENTATION_DATA,
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

const EditableTextAreaField = ({text, icon, iconTitle, isEdit, onChangeContent}) => {
    const [editToggle, setEditToggle] = useState(false);
    const [content, setContent] = useState(text)

    function onChange(e) {
        setContent(e?.target?.value);
        onChangeContent(content);
    }

    return(
        <div className="d-flex flex-column my-4">
            <div className="d-flex flex-row justify-content-start align-items-center">
                <IconSubTitle text={iconTitle} icon={icon}/>
                {isEdit &&
                <IconButton onClick={() => {setEditToggle(!editToggle)}}>
                    <ModeEdit/>
                </IconButton>}
            </div>
            {(editToggle && isEdit) &&
            <Grid container>
                  <Grid item md={7} lg={7} sm={12} xs={12}>
                    <TextareaAutosize
                        name={"aboutMe"}
                        defaultValue={content}
                        className="multi-text-field px-2 py-1 w-100"
                        maxRows={3}
                        minRows={3}
                        onChange={onChange}
                    />
                  </Grid>
            </Grid>}
            <div className="mx-2 text-success">{<Typography variant={"h6"}>{content}</Typography>}</div>
        </div>
    );
}

const EditableListField = ({data, defaultValue, icon, iconTitle, isEdit, onSelectedItem}) => {
    const [editToggle, setEditToggle] = useState(false);
    const [value, setValue] = useState(getSelectedValue(defaultValue));

    function onSelect(e) {
        let selectedTag = e?.target?.value;
        onSelectedItem(e?.target?.value);
        setValue(getSelectedValue(selectedTag));
    }

    function getSelectedValue(selectedTag) {
        if (data?.length > 0) {
            return ((data.filter(elem => (elem?.tag === selectedTag))[0])?.value);
        }
        return '';
    }

    return(
        <div className="d-flex flex-column my-4">
            <div className="d-flex flex-row justify-content-start align-items-center">
                <IconSubTitle text={iconTitle} icon={icon}/>
                {isEdit &&
                <IconButton onClick={() => {setEditToggle(!editToggle)}}>
                    <ModeEdit/>
                </IconButton>}
            </div>
            {(editToggle && isEdit) &&
            <Grid container>
                <Grid item md={4} lg={4} sm={12} xs={12}>
                    <FormControl variant="standard" fullWidth>
                        <Select
                            defaultValue={defaultValue}
                            onChange={onSelect}>
                            {data.map((elem, key) =>
                                <MenuItem key={key} value={elem?.tag}>{elem?.value}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>}
            <div className="mx-2 text-success">{<Typography variant={"h6"}>{value}</Typography>}</div>
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
    const [profile_, setProfile] = useState(profile);
    const [editToggle, setEditToggle] = useState({
        isInterests: false,
        isAboutMe: false,
        isWhoSearch: false,
        isSexOrientation: false,
        isSex: false,
        isKids: false,
        isFamilyStatus: false,
    })

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
                            <Grid key={key} item xs={12} sm={4} md={4}>
                                <Card className="card m-1">
                                    <CardMedia
                                        component="img"
                                        key={key}
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
            <EditableTextAreaField
                text={profile?.aboutMe}
                isEdit={isEdit}
                icon={<Kitesurfing />}
                iconTitle={SUBTITLE_HOBBIES}
                onChangeContent={(text) => {}}/>

            <EditableTextAreaField
                text={profile?.aboutMe}
                isEdit={isEdit}
                icon={<Group />}
                iconTitle={SUBTITLE_WHOM_LOOKING_FOR}
                onChangeContent={(text) => {}}/>

            <EditableTextAreaField
                text={profile?.aboutMe}
                isEdit={isEdit}
                icon={<Mood />}
                iconTitle={SUBTITLE_ABOUT_ME}
                onChangeContent={(text) => {}}/>

            <EditableListField
                iconTitle={SUBTITLE_SEX_ORIENTATION}
                icon={<RoundaboutLeft />}
                isEdit={isEdit}
                onSelectedItem={(value) => {console.log("sex orientation: "+value)}}
                defaultValue={profile?.sexOrientation}
                data={SEX_ORIENTATION_DATA}
            />

            <EditableListField
                iconTitle={SUBTITLE_SEX}
                icon={<Face />}
                isEdit={false}
                onSelectedItem={(value) => {console.log("sex: "+value)}}
                defaultValue={profile?.sex}
                data={SEX_DATA}
            />

            <EditableListField
                iconTitle={SUBTITLE_CHILDS}
                icon={<ChildCare />}
                isEdit={true}
                onSelectedItem={(value) => {console.log("kids: "+value)}}
                defaultValue={profile?.kids > 0 ? 'YES' : 'NO'}
                data={KIDS_DATA}
            />

            <EditableListField
                iconTitle={SUBTITLE_FAMILY_STATUS}
                icon={<FamilyRestroom />}
                isEdit={true}
                onSelectedItem={(value) => {console.log("familyStatus: "+value)}}
                defaultValue={profile?.familyStatus}
                data={profile?.sex === 'MAN' ? FAMILY_STATUS_DATA.man : FAMILY_STATUS_DATA.woman}
            />

            <ActionButtons isEdit={isEdit}/>
            <ActionSave isEdit={isEdit}/>
            <div className="p-4"></div>
        </div>
    )
}

export default DesktopGallery;