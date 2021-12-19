import './App.css';
import ChatView from './Chat/ChatView/ChatView';
import { Routes, Route } from 'react-router-dom';
import SignIn from "./SignIn/SignIn";
import NavMenu from "./Navigation/NavMenu";
import RegistProfilePrimary from './RegistProfilePrimary/RegistProfilePrimary';

function App() {
  return (
      <div>
        <NavMenu/>
        <Routes>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/registration" element={<RegistProfilePrimary/>}/>
          <Route path="/" element={<ChatView/>}/>
        </Routes>
      </div>
  );
}

export default App;
