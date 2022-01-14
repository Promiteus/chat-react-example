import React, {useEffect, useState} from 'react';
import RightChevron from "../../../../Svg/RightChevron";
import './UserProfile.css';
import {Avatar, Paper, Typography} from "@mui/material";
import {dateDiffYears} from "../../../../Componetns/DateHandlers";
import {stringAvatar} from "../../../../Componetns/GraphicHandler";
import {BASE_DATA_URL} from "../../../../Stores/api/Common/ApiCommon";



export default function Userprofile({user, selected, onClick}) {
    const [select, setSelect] = useState(false);

    useEffect(() => {
        setSelect(selected);
    }, [user, selected]);

    const styles = {
        redBg: {
            backgroundColor: select ? '#d5e6f6': 'white',

        }
    }

    return (
        <Paper elevation={2} sx={{'&:hover': { backgroundColor: 'primary.main', opacity: [0.9, 0.8, 0.7],}}}
             className="d-flex flex-row "
             style={styles.redBg}
             onClick={() => onClick({user})}>
          <div className="border-dark d-flex p-1">
              {user?.thumbUrl ?
                  <Avatar alt={user?.firstName} src={`${BASE_DATA_URL}${user?.thumbUrl}`}/> :
                  <Avatar {...stringAvatar(`${user?.firstName} ${user?.lastName}`)} />
              }
          </div>
          <div className="d-flex flex-row justify-content-between flex-grow-1">
              <div className="d-flex flex-column">
                  <Typography variant={"subtitle1"}>{user?.firstName} {user?.lastName}</Typography>
                  <Typography variant={"body2"}>Возраст: {dateDiffYears(user?.birthDate, new Date().toDateString())}</Typography>
              </div>
              <div className="mt-2">
                  <RightChevron/>
              </div>
          </div>
        </Paper>
    );


}



