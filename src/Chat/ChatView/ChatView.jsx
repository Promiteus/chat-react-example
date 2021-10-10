import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ToastV1 from '../Components/Toasts/ToastV1/ToastV1';
import MessageSendView from '../MessageSendView/MessageSendView';
import MessageView from '../MessageView/MessageView';
import NameView from '../NameView/NameView';
import TopHeaderView from '../TopHeaderView/TopHeaderView';
import { StompClient } from '../Websocker/ws';
import './ChatView.css'


function ChatView (props) {
  const [showError, setShowError] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  var stompClient = new StompClient();

  useEffect(() => {    
    stompClient.connect();

    stompClient.connectionError = (error) => {
       setErrMsg(error);
       setShowError(true);
       setInterval(() => {setShowError(false)}, 5000);
    }     

    return () => {
      stompClient.disconnect();  
      stompClient = null;
    }
  }, [])

  return (
    <div>
      <Container className="chat-panel">
        <Row>
          <Col md={3}>
            <div className="users p-2">

            </div>
          </Col>
          <Col md={9}>
            <div className="chat p-2">
             <TopHeaderView/>
             <NameView />     
             <MessageView stomp={stompClient}/>
             <MessageSendView stomp={stompClient} />
            </div>
          </Col>
        </Row>       
      </Container>   
      <ToastV1 msg={errMsg} isShow={showError}/>
    </div>   
  );
}


export default ChatView;
