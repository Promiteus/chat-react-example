import React, {useEffect, useState} from 'react';
import Userprofile from "./UserProfile/UserProfile";

/**
 *
 * @param users
 * @returns {JSX.Element}
 * @constructor
 */
export default function Userlist({users}) {
    const [selectedUser, setSelectedUser] = useState(0);

    function clickItem({user}) {
        console.log('clickItem: '+user.id);
        setSelectedUser(user.id);
    }

    useEffect(() => {
        setSelectedUser(0);
    }, [users]);

    return (
      <div className="UserList p-2">
          <div><h4>Анкеты</h4></div>
          {users.map((user) => {
            return <div key={user.id} className="border-bottom border-1 border-dark">
                  <Userprofile onClick={clickItem} selected={(selectedUser === user.id)} user={user}/>
              </div>
          })}
      </div>
    );
}
