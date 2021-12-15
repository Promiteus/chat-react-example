import SockJS from "sockjs-client";
import Stomp from 'stompjs';
import { ChatMessage } from "../Common/Models/ChatMessage";


export class StompClient {

   
    constructor() {
        console.log('StompClient created!'); 
               
        this.WS_ENDPOOINT_APP = 'http://localhost:10800/wsApp'
        this.topicName = 'roman';
        //this.chatMessage = {type: 'chat', content: '', sender: ''};
        this.stompClient = null;
        this.client = null
    }
    

    connect(event) {
        this.client = new SockJS(this.WS_ENDPOOINT_APP);
        this.stompClient = Stomp.over(this.client); 
        this.stompClient.connect(
            {}, 
            (data) => this.connectionSuccess(data), 
            (error) => this.connectionError(error)
        );     
    }

    connectionSuccess(frame) {
        let topic = '/topic/'+this.topicName;
        this.stompClient.subscribe(topic, (data) => this.onMessageReceived(data));
    }

    onMessageReceived(message) {
        var content = JSON.stringify(message.body);
        console.log('onMessageReceived error -- '+content);
    }
    
    disconnect() {
        if (this.stompClient) {
            let topic = `/topic/${this.topicName}`;    
            this.stompClient.unsubscribe(topic);            
        }       
    
        if (this.client) {
            this.client.close();    
        }        
    }

    connectionError(error) {
        console.log('connectionError error: '+error);
    }

   

    sendMessage(type, sender, routerKey, content) {
        //this.topicName = routerKey;
        if (this.stompClient) {
            this.stompClient.send(
                "/app/chat.sendMessage2",
                {},
                JSON.stringify(new ChatMessage(type, sender, content, routerKey))
            );
        }
    }
}

