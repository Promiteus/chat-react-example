import SockJS from "sockjs-client";
import Stomp from 'stompjs';
import { ChatMessage } from "../Common/Models/ChatMessage";
import {getEnvOfStorage} from "../../Stores/Env";


export class StompClient {
    connected = false;
   
    constructor() {
        console.log('StompClient created!'); 
               
        this.WS_ENDPOOINT_APP = getEnvOfStorage()?.stompUrl
        this.stompClient = null;
        this.client = null
    }
    

    connect(userId) {
        this.client = new SockJS(this.WS_ENDPOOINT_APP);
        this.stompClient = Stomp.over(this.client); 
        this.stompClient.connect(
            {}, 
            (data) => this.connectionSuccess(userId),
            (error) => this.connectionError(error)
        );     
    }

    connectionSuccess(userId) {
        let topic = '/topic/'+userId;
        this.stompClient.subscribe(topic, (data) => this.onMessageReceived(data));
        this.connected = true;
    }

    onMessageReceived(message) {
        var content = JSON.stringify(message.body);
        console.log('onMessageReceived error -- '+content);
    }
    
    disconnect() {
       if ((this.connected)) {
           if (this.stompClient) {
               let topic = `/topic/${this.topicName}`;
               this.stompClient.unsubscribe(topic);
           }

           if (this.client) {
               this.client.close();
           }
       }
    }

    connectionError(error) {
        console.log('connectionError error: '+error);
        this.connected = false;
    }

   

    sendMessage(type, sender, routerKey, content) {
        //this.topicName = routerKey;
        if (this.stompClient) {
            this.stompClient.send(
                "/app/chat",
                {},
                JSON.stringify(new ChatMessage(type, sender, content, routerKey))
            );
        }
    }
}

