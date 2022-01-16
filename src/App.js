import './App.css';
import {Routes, Route} from 'react-router-dom';
import SignIn from "./SignIn/SignIn";
import RegistProfilePrimary from './RegistProfilePrimary/RegistProfilePrimary';
import MainTab from "./Componetns/Tabs/MainTab";

function App() {
  return (
      <div>
        <Routes>
          <Route index path="/signin" element={<SignIn/>}/>
          <Route path="/registration" element={<RegistProfilePrimary/>}/>
          <Route path="/" element={<MainTab/>}/>
        </Routes>
      </div>
  );
}

export default App;
