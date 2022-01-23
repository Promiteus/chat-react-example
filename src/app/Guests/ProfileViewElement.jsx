import React from "react";
import {
    IconButton,
    ImageListItem, ImageListItemBar,
} from "@mui/material";
import {BASE_DATA_URL} from "../Stores/api/Common/ApiCommon";
import {useDispatch} from "react-redux";
import {defineSelectedUser, setPageIndex} from "../Stores/slices/CommonSlice";
import {Chat} from "@mui/icons-material";


const ProfileViewElement = ({profile}) => {
    const dispatch = useDispatch();

    return(
        <>
          <ImageListItem className="m-1">
              <img
                  className="photo-card"
                  src={`${BASE_DATA_URL}${profile?.thumbUrl?.src}`}
                  srcSet={`${BASE_DATA_URL}${profile?.thumbUrl?.src}`}
                  alt={`${profile?.firstName} ${profile?.lastName}`}
                  loading="lazy"
                  onClick={() => {
                      dispatch(setPageIndex(1));
                      dispatch(defineSelectedUser(profile));
                  }}
              />
              <ImageListItemBar
                  title={`${profile?.firstName} ${profile?.lastName}`}
                  subtitle={""}
                  actionIcon={
                      <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          aria-label={`info about ${profile.title}`}
                      >
                          <Chat />
                      </IconButton>
                  }
              />
          </ImageListItem>
        </>
    );
}

export default ProfileViewElement;