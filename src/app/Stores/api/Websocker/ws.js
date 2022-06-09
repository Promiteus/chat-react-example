import SockJS from "sockjs-client";
import Stomp from 'stompjs';
import { ChatMessage } from "../../../Chat/Common/Models/ChatMessage";
import {getEnvOfStorage} from "../../Env";


export class StompClient {
    connected = false;
    attemts = null;
   
    constructor() {
        console.log('StompClient created!'); 
               
        this.WS_ENDPOOINT_APP = getEnvOfStorage()?.stompUrl
        this.stompClient = null;
        this.client = null;
    }

    destructor() {
        clearInterval(this.attemts);
    }
    

    connect(userId) {
        this.client = new SockJS(this.WS_ENDPOOINT_APP);
        this.stompClient = Stomp.over(this.client); 
        this.stompClient.connect(
            {}, 
            (data) => this.connectionSuccess(userId),
            (error) => this.connectionError(error)
        );
        this.client.onclose = () => {
            console.log("closed");
            this.connected = false;
        }
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
               this.connected = false;
           }
       }
    }

    connectionError(error) {
        console.log('connectionError: '+error);
        this.connected = false;
    }

   

    sendMessage(type, sender, routerKey, content) {
        //this.topicName = routerKey;
        if (this.stompClient) {
            let res = this.stompClient.send(
                "/app/chat",
                {},
                JSON.stringify(new ChatMessage(type, sender, content, routerKey))
            );

        }
    }

    /**
     * Попытка соединиться к серверу WebSocket
     * @param {StompClient} stomp
     * @param {string} currentUserId
     * @param function(error: any) callback
     */
    async tryStompConnect(stomp, currentUserId, callback) {
        this.attemts = setInterval(() => {
               if (!this.connected) {
                   console.log("try to ws connect...")
                   stomp?.connect(currentUserId);

                   stomp.connectionError = (error) => {
                       callback(error);
                   }
               }
           }, 3000);
    }

}

