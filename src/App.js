import './App.css';
import ChatView from './Chat/ChatView/ChatView';
import {useEffect} from "react";


function App() {
  useEffect(() => {
      console.log("App refresh");
  })

  return (
    <ChatView/>
  );
}



export default App;
