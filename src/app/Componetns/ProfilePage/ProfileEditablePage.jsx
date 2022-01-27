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
    CAPTION_COMPLAIN,
    CAPTION_SAVE,
    CAPTION_WRITE, EMPTY_TEXT_PROFILE_FIELD,
    FAMILY_STATUS_DATA,
    KIDS_DATA,
    MEET_PREFERENCES_DATA,
    MSG_NO,
    MSG_YES,
    SEX_DATA,
    SEX_ORIENTATION_DATA,
    SUBTITLE_ABOUT_ME,
    SUBTITLE_CHILDS,
    SUBTITLE_FAMILY_STATUS,
    SUBTITLE_HOBBIES,
    SUBTITLE_MY_PHOTOS,
    SUBTITLE_SEX,
    SUBTITLE_SEX_ORIENTATION,
    SUBTITLE_WHOM_LOOKING_FOR
} from "../../Constants/TextMessagesRu";
import {dateDiffYears} from "../DateHandlers";
import {useDispatch, useSelector} from "react-redux";
import {saveProfileAsync, selectProfile} from "../../Stores/slices/UserProfileSlices";


const ActionButtons = ({isEdit, onWriteClick, onComplainClick}) => {
    return (
      <div>
          {!isEdit &&
          <div className="d-flex flex-row justify-content-center align-content-center">
              <Button variant={"outlined"} startIcon={<ChatTwoTone/>} className="mx-1" onClick={onWriteClick}>
                  <Typography variant={"subtitle1"}>{CAPTION_WRITE}</Typography>
              </Button>
              <Button variant={"outlined"} color={"error"} startIcon={<Block/>} className="mx-1" onClick={onComplainClick}>
                  <Typography variant={"subtitle1"}>{CAPTION_COMPLAIN}</Typography>
              </Button>
          </div>}
      </div>
    );
}

const ActionSave = ({isEdit, onClick}) => {
    return (
        <div>
            {isEdit &&
            <div className="d-flex flex-row justify-content-center align-content-center">
                <Button variant={"outlined"} startIcon={<ChatTwoTone/>} className="mx-1" onClick={onClick}>
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
                        maxLength={1000}
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
  "imgUrls": [
                {
                    "src": "/api/resource?user_id=201&file_id=kimi_ni_todoke_devushka_paren_lyubov_chuvstva_vstrecha_svidanie_29715_1280x1280.jpg",
                    "alt": "kimi_ni_todoke_devushka_paren_lyubov_chuvstva_vstrecha_svidanie_29715_1280x1280.jpg"
                }
            ],
            "thumbUrl": {
                "src": "/api/resource/thumb?user_id=201",
                "alt": "kimi_ni_todoke_devushka_paren_lyubov_chuvstva_vstrecha_svidanie_29715_1280x1280.jpg"
            }
 *
 * */

const ProfileEditablePage = ({profile, isEdit}) => {
    const [visible, setVisible] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const [profile_, setProfile] = useState(profile);
    const profileDispatch = useDispatch();
    const {response, status, loading} = useSelector(selectProfile);

    function getFullUrls() {
        return (profile?.imgUrls?.length > 0) ?
            profile?.imgUrls.map(elem => ({src: `${BASE_DATA_URL}${elem?.src}`, alt: elem?.alt})) :
            [{src: '', alt: ''}];
    }

    /*useEffect(() => {
     //   console.log("updated profle: "+JSON.stringify(profile_));
    });

    useEffect(() => {
        console.log("updated profile status: "+status);
    }, [status]);*/

    /**
     * Событие отправки данных о отредактированном профиле пользователе
     * */
    function onProfileSave() {
        profileDispatch(saveProfileAsync({profile: profile_}));
    }

    /**
     * Пожаловаться на пользователя
     */
    function onComplainClick() {
       //TODO
    }

    /**
     * Перейти в чат с пользователем
     */
    function onWriteClick() {
       //TODO
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
                <div className="w-100">
                    <Grid container >
                        {getFullUrls().map((item, key) => (
                            <Grid key={key} item xs={12} sm={4} md={4} lg={4}>
                                <Card className="card m-1 photo-card">
                                    <CardMedia
                                        component="img"
                                        key={key}
                                        height="300"
                                        image={item.src}
                                        alt={item.alt}
                                        sx = {{padding: 1}}
                                        onClick={() => showImagePreview(key)}
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>

            <Grid container className="p-2">
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <EditableTextAreaField
                        text={profile_?.hobby || EMPTY_TEXT_PROFILE_FIELD}
                        isEdit={isEdit}
                        icon={<Kitesurfing />}
                        iconTitle={SUBTITLE_HOBBIES}
                        onChangeContent={(text) => {setProfile(prevState => ({...prevState, hobby: text}))}}/>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <EditableListField
                        iconTitle={SUBTITLE_WHOM_LOOKING_FOR}
                        icon={<Group />}
                        isEdit={isEdit}
                        onSelectedItem={(value) => {setProfile(prevState => ({...prevState, meetPreferences: value}))}}
                        defaultValue={profile?.meetPreferences}
                        data={MEET_PREFERENCES_DATA}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <EditableTextAreaField
                        text={profile_?.aboutMe || EMPTY_TEXT_PROFILE_FIELD}
                        isEdit={isEdit}
                        icon={<Mood />}
                        iconTitle={SUBTITLE_ABOUT_ME}
                        onChangeContent={(text) => {setProfile(prevState => ({...prevState, aboutMe: text}))}}/>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <EditableListField
                        iconTitle={SUBTITLE_SEX_ORIENTATION}
                        icon={<RoundaboutLeft />}
                        isEdit={isEdit}
                        onSelectedItem={(value) => {setProfile(prevState => ({...prevState, sexOrientation: value}))}}
                        defaultValue={profile_?.sexOrientation}
                        data={SEX_ORIENTATION_DATA}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <EditableListField
                        iconTitle={SUBTITLE_SEX}
                        icon={<Face />}
                        isEdit={false}
                        onSelectedItem={(value) => {setProfile(prevState => ({...prevState, sex: value}))}}
                        defaultValue={profile_?.sex}
                        data={SEX_DATA}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <EditableListField
                        iconTitle={SUBTITLE_CHILDS}
                        icon={<ChildCare />}
                        isEdit={true}
                        onSelectedItem={(value) => {setProfile(prevState => ({...prevState, kids: value === 'YES' ? 1 : 0}))}}
                        defaultValue={profile_?.kids > 0 ? 'YES' : 'NO'}
                        data={KIDS_DATA}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <EditableListField
                        iconTitle={SUBTITLE_FAMILY_STATUS}
                        icon={<FamilyRestroom />}
                        isEdit={true}
                        onSelectedItem={(value) => {setProfile(prevState => ({...prevState, familyStatus: value}))}}
                        defaultValue={profile_?.familyStatus}
                        data={profile?.sex === 'MAN' ? FAMILY_STATUS_DATA.man : FAMILY_STATUS_DATA.woman}
                    />
                </Grid>
            </Grid>

            <ActionButtons isEdit={isEdit} onComplainClick={onComplainClick} onWriteClick={onWriteClick}/>
            <ActionSave isEdit={isEdit} onClick={onProfileSave}/>
            <div className="p-4"></div>
        </div>
    )
}

export default ProfileEditablePage;