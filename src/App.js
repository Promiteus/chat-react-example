import './App.css';
import ChatView from './Chat/ChatView/ChatView';
import {Routes, Route, useNavigate} from 'react-router-dom';
import SignIn from "./SignIn/SignIn";
import NavMenu from "./Navigation/NavMenu";
import RegistProfilePrimary from './RegistProfilePrimary/RegistProfilePrimary';
import {useEffect} from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {

  }, []);


  return (
      <div>
        <NavMenu/>
        <Routes>
          <Route index path="/signin" element={<SignIn/>}/>
          <Route path="/registration" element={<RegistProfilePrimary/>}/>
          <Route path="/" element={<ChatView/>}/>
        </Routes>
      </div>
  );
}

export default App;
