import './App.css';
import {Routes, Route} from 'react-router-dom';
import SignIn from "./app/SignIn/SignIn";
import RegistProfilePrimary from './app/RegistProfilePrimary/RegistProfilePrimary';
import MainTab from "./app/Componetns/Tabs/MainTab";
import {ROUTE_HOME, ROUTE_PROFILE, ROUTE_REGISTRATION, ROUTE_SIGNUP} from "./app/Constants/Routes";
import MyProfile from "./app/ProfileDetails/MyProfile";

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
  return (
      <div>
        <Routes>
          <Route index path={ROUTE_SIGNUP} element={<SignIn/>}/>
          <Route path={ROUTE_REGISTRATION} element={<RegistProfilePrimary/>}/>
          <Route path={ROUTE_HOME} element={<MainTab/>}/>
          <Route path={ROUTE_PROFILE} element={<MyProfile />}/>
        </Routes>
      </div>
  );
}

export default App;
