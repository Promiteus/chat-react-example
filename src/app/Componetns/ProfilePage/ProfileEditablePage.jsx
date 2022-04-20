import React, {useEffect, useState} from "react";
import {BASE_DATA_URL} from "../../Stores/api/Common/ApiCommon";
import {
    Button,
    Card,
    CardMedia,
    FormControl,
    Grid,
    IconButton, MenuItem, Select,
    TextareaAutosize,
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
    ModeEdit, SearchOutlined, SaveAltOutlined, Save, ChatOutlined, BlockOutlined,
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
import {useDispatch, useSelector} from "react-redux";
import {saveProfileAsync, selectProfile} from "../../Stores/slices/UserProfileSlices";
import {NO_PHOTO_PNG} from "../../../assets";
import {setChatSelectedUser, setPageIndex, setTbIndex} from "../../Stores/slices/CommonSlice";
import {addChatMessageAsync} from "../../Stores/slices/ChatMessageSlice";
import useWindowDimensions, {D_LG, D_XL} from "../../Hooks/useWindowDimension";
import IconFab from "../Fabs/IconFab";
import VerticalFabs from "../Fabs/VerticalFabs";
import PhotoCard from "../Photo/PhotoCard";


const ActionButtons = ({isEdit, onWriteClick, onComplainClick, textColor, borderColor, bgColor}) => {
    return (
      <div>
          {!isEdit &&
          <div className="d-flex flex-row justify-content-center align-content-center">
              <Button
                  sx={{
                      color: textColor || '#FFFFFF',
                      borderColor: borderColor || '#6c34ef',
                      backgroundColor: bgColor || '#6c34ef'}
                  }
                  variant={"contained"}
                  startIcon={<ChatTwoTone/>}
                  className="mx-1"
                  onClick={onWriteClick}>
                  <Typography variant={"subtitle1"}>{CAPTION_WRITE}</Typography>
              </Button>
              <Button
                  sx={{
                      color: textColor || '#FFFFFF',
                      borderColor: borderColor || '#6c34ef',
                      backgroundColor: bgColor || '#6c34ef'}
                  }
                  variant={"contained"}
                  color={"error"}
                  startIcon={<Block/>}
                  className="mx-1"
                  onClick={onComplainClick}>
                  <Typography variant={"subtitle1"}>{CAPTION_COMPLAIN}</Typography>
              </Button>
          </div>}
      </div>
    );
}

const ActionSave = ({isEdit, onClick, textColor, borderColor, bgColor}) => {
    return (
        <div>
            {isEdit &&
            <div className="d-flex flex-row justify-content-center align-content-center">
                <Button
                    sx={{
                        color: textColor || '#FFFFFF',
                        borderColor: borderColor || '#6c34ef',
                        backgroundColor: bgColor || '#6c34ef'}
                    }
                    variant={"contained"}
                    startIcon={<ChatTwoTone/>}
                    className="mx-1"
                    onClick={onClick}>

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
                  <Grid item md={8} lg={8} sm={12} xs={12}>
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

const ProfileEditablePage = ({profile, isEdit, currentUserId}) => {
    const [visible, setVisible] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const [profile_, setProfile] = useState(profile);
    const profileDispatch = useDispatch();
    const pageDispatch = useDispatch();
    const {dimType} = useWindowDimensions();

    const fabStyle = {
        position: 'absolute',
        bottom: 35,
        right: 46,
        zIndex: 999
    };

    const fabs = [
       {
            icon: <ChatTwoTone/>,
            bgColor: '#6c34ef',
            ariaLabel: 'write',
            iconColor: '#ffffff',
            onClick: function (e) {
                onWriteClick();
            }
       },
       {
            icon: <BlockOutlined/>,
            bgColor: '#FF0000',
            ariaLabel: 'write',
            iconColor: '#ffffff',
            onClick: function (e) {
                onComplainClick();
            }
       },
    ]

    function getFullUrls() {
        return (profile?.imgUrls?.length > 0) ?
            profile?.imgUrls.map(elem => ({src: `${BASE_DATA_URL}${elem?.src}`, alt: elem?.alt})) : [];
    }

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
        //Отправить пустое сообщение, чтобы добавить новую историю чата для текущего пользователя
        pageDispatch(addChatMessageAsync({
            userId: profile?.id,
            fromUserId: currentUserId,
            message: "",
        }));
        pageDispatch(setPageIndex(-1));
        pageDispatch(setChatSelectedUser(profile));
    }

    function showImagePreview(index) {
        setVisible(true);
        setImageIndex(index);
    }

    return(
        <>
            <div className="d-block h-100 my-2 px-4 py-2 position-relative">
                <div>
                    <Viewer
                        visible={visible}
                        onClose={() => { setVisible(false); } }
                        images={getFullUrls()}
                        noFooter={true}
                        activeIndex={imageIndex}
                    />
                </div>
                <div className="d-flex flex-row justify-content-start align-items-center">
                    <IconSubTitle text={SUBTITLE_MY_PHOTOS} icon={<PhotoCamera />}/>
                </div>
                <div className="d-flex justify-content-start my-2 w-100">
                    <div className="w-100">
                        <Grid container >
                            {getFullUrls()?.length > 0 &&
                             getFullUrls()?.map((item, key) => (
                                    <Grid key={key} item xs={12} sm={12} md={3} lg={4}>
                                        <Card className="card m-1 photo-card">
                                            {(item.src !== '') ?
                                                <PhotoCard
                                                    key={key}
                                                    height={300}
                                                    imgUrl={item?.src}
                                                    alt={profile?.thumbUrl?.alt}
                                                    onClick={() => showImagePreview(key)}
                                                    sex={profile?.sex}
                                                    isEditable={isEdit}
                                                />
                                                :
                                                <PhotoCard isAdd={true} isEditable={isEdit}/>
                                            }
                                        </Card>
                                    </Grid>
                                ))}
                            {getFullUrls()?.length === 0 &&
                            <Grid item xs={12} sm={12} md={3} lg={4}>
                                <Card className="card m-1 photo-card">
                                    <PhotoCard isAdd={true} isEditable={isEdit}/>
                                </Card>
                            </Grid>}
                        </Grid>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-start align-items-center my-4">
                    <RoundSubstrate children={<Person />} color={"orange"}/>
                    <div className="mx-2 text-success">
                        {<Typography variant={"h3"}>{`${profile_?.firstName} ${profile_?.lastName}, ${profile?.age}`}</Typography>}
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
                            defaultValue={profile_?.meetPreferences}
                            data={MEET_PREFERENCES_DATA}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <EditableTextAreaField
                            text={profile?.aboutMe || EMPTY_TEXT_PROFILE_FIELD}
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
                            isEdit={isEdit}
                            onSelectedItem={(value) => {setProfile(prevState => ({...prevState, sex: value}))}}
                            defaultValue={profile_?.sex}
                            data={SEX_DATA}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <EditableListField
                            iconTitle={SUBTITLE_CHILDS}
                            icon={<ChildCare />}
                            isEdit={isEdit}
                            onSelectedItem={(value) => {setProfile(prevState => ({...prevState, kids: value === 'YES' ? 1 : 0}))}}
                            defaultValue={profile_?.kids > 0 ? 'YES' : 'NO'}
                            data={KIDS_DATA}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <EditableListField
                            iconTitle={SUBTITLE_FAMILY_STATUS}
                            icon={<FamilyRestroom />}
                            isEdit={isEdit}
                            onSelectedItem={(value) => {setProfile(prevState => ({...prevState, familyStatus: value}))}}
                            defaultValue={profile?.familyStatus}
                            data={profile?.sex === 'MAN' ? FAMILY_STATUS_DATA.man : FAMILY_STATUS_DATA.woman}
                        />
                    </Grid>
                </Grid>

                {((dimType === D_LG) || (dimType === D_XL)) &&
                   <ActionButtons
                       isEdit={isEdit}
                       onComplainClick={onComplainClick}
                       onWriteClick={onWriteClick}/>
                }
                {((dimType === D_LG) || (dimType === D_XL)) &&
                   <ActionSave
                       isEdit={isEdit}
                       onClick={onProfileSave}/>
                }

                <div className="p-4"></div>
            </div>
            {((dimType !== D_LG) && (dimType !== D_XL) && isEdit) &&
            <IconFab
                icon={<Save/>}
                bgColor={"#6c34ef"}
                ariaLabel={'save'}
                iconColor={'#ff7700'}
                fabStyle={fabStyle}
                onClick={onProfileSave}
            />}

            {((dimType !== D_LG) && (dimType !== D_XL) && !isEdit) &&
            <VerticalFabs fabStyle={fabStyle} fabs={fabs}/>}
        </>
    )
}

export default ProfileEditablePage;