import React, {useEffect, useState} from 'react';
import RightChevron from "../../../../Svg/RightChevron";
import './UserProfile.css';



export default function Userprofile({user, selected, onClick}) {
    const [select, setSelect] = useState(false);

    useEffect(() => {
        setSelect(selected);
    }, [user, selected]);

    const styles = {
        redBg: {
            backgroundColor: select ? '#cff3a9': 'white',
        }
    }

    return (
        <div className="UserProfile d-flex flex-row " style={styles.redBg} onClick={() => onClick({user})}>
          <div className="border-dark border-1 d-flex p-1">
              <img alt="" src="https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png" width={40} height={40}/>
          </div>
          <div className="d-flex flex-row justify-content-between flex-grow-1">
              <div className="d-flex flex-column">
                  <div><b>{user.name} {user.secondName}</b></div>
                  <div>Возраст: {user.age}</div>
              </div>
              <div className="mt-2">
                  <RightChevron/>
              </div>
          </div>
        </div>
    );


}



