export class TokenResponse {
    token;
    token_expire_sec;
    user_id;

    constructor(token, token_expire_sec, user_id) {
        this.token = token;
        this.token_expire_sec = token_expire_sec;
        this.user_id = user_id;
    }
}