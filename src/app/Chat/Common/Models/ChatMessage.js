export class ChatMessage {
    type = '';
    content = '';
    routerKey = '';
    sender = '';
    dateTime = null;
    
    constructor(type, sender, content, routerKey) {
      this.type = type;
      this.content = content;
      this.sender = sender;
      this.routerKey = routerKey;
      this.dateTime = new Date();
    }
}