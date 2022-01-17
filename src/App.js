import './App.css';
import {Routes, Route} from 'react-router-dom';
import SignIn from "./app/SignIn/SignIn";
import RegistProfilePrimary from './app/RegistProfilePrimary/RegistProfilePrimary';
import MainTab from "./app/Componetns/Tabs/MainTab";
import {ROUTE_HOME, ROUTE_REGISTRATION, ROUTE_SIGNUP} from "./app/Constants/Routes";

function App() {
  return (
      <div>
        <Routes>
          <Route index path={ROUTE_SIGNUP} element={<SignIn/>}/>
          <Route path={ROUTE_REGISTRATION} element={<RegistProfilePrimary/>}/>
          <Route path={ROUTE_HOME} element={<MainTab/>}/>
        </Routes>
      </div>
  );
}

export default App;
