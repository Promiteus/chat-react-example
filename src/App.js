import './App.css';
import ChatView from './Chat/ChatView/ChatView';
import { Routes, Route } from 'react-router-dom';
import SignIn from "./SignIn/SignIn";
import NavMenu from "./Navigation/NavMenu";
import RegistForm from './RegistForm/RegistForm';
import RegistProfilePrimary from './RegistProfilePrimary/RegistProfilePrimary';
import RegistProfileSecondary from './RegistProfileSecondary/RegistProfileSecondary';

function App() {
  return (
      <div>
        <NavMenu/>
        <Routes>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/registration" element={<RegistForm/>}/>
          <Route path="/profile-prim" element={<RegistProfilePrimary/>}/>
          <Route path="/profile-sec" element={<RegistProfileSecondary/>}/>
          <Route path="/" element={<ChatView/>}/>          
        </Routes>
      </div>
  );
}

export default App;
