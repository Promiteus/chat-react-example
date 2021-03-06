import './App.css';
import {Routes, Route} from 'react-router-dom';
import SignIn from "./app/SignIn/SignIn";
import RegistProfilePrimary from './app/RegistProfilePrimary/RegistProfilePrimary';
import MainTab from "./app/Components/Tabs/MainTab";
import {ROUTE_HOME, ROUTE_PROFILE, ROUTE_REGISTRATION, ROUTE_SIGNUP} from "./app/Constants/Routes";
import MyProfile from "./app/ProfileDetails/MyProfile";
import {setEnvToStorage} from "./app/Stores/Env";
import {BASE_AUTH_URL, BASE_DATA_URL, WS_STOMP_URL} from "./app/Stores/api/Common/ApiCommon";
import {createTheme, ThemeProvider} from "@mui/material";
import {orange} from "@mui/material/colors";


const theme = createTheme({
    palette: {
        primary: {
            main: '#f55f0d',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#9d1cf8',
            contrastText: '#000',
        },
    },
});

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
  const environment = process.env;
  const envData = {
        env: !(environment?.REACT_APP_ENV) ? 'dev': environment?.REACT_APP_ENV,
        authUrl: !(environment?.REACT_APP_BASE_AUTH_URL) ? BASE_AUTH_URL : environment?.REACT_APP_BASE_AUTH_URL,
        dataUrl: !(environment?.REACT_APP_BASE_DATA_URL) ? BASE_DATA_URL : environment?.REACT_APP_BASE_DATA_URL,
        stompUrl: !(environment?.REACT_APP_BASE_WS_URL) ? WS_STOMP_URL : environment?.REACT_APP_BASE_WS_URL,
  };

  setEnvToStorage(envData);

  return (
      <ThemeProvider theme={theme}>
          <div>
              <Routes>
                  <Route index path={ROUTE_SIGNUP} element={<SignIn/>}/>
                  <Route path={ROUTE_REGISTRATION} element={<RegistProfilePrimary/>}/>
                  <Route path={ROUTE_HOME} element={<MainTab/>}/>
                  <Route path={ROUTE_PROFILE} element={<MyProfile />}/>
              </Routes>
          </div>
      </ThemeProvider>
  );
}

export default App;
