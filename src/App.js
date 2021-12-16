import './App.css';
import ChatView from './Chat/ChatView/ChatView';
import { Routes, Route } from 'react-router-dom';
import SignIn from "./SignIn/SignIn";
import NavMenu from "./Navigation/NavMenu";

function App() {
  return (
      <div>
        <NavMenu/>
        <Routes>
          <Route path="/" element={<ChatView/>}/>
          <Route path="/signin" element={<SignIn/>}/>
        </Routes>
      </div>
  );
}

export default App;
