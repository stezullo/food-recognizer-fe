export default class User {
    private username: string;
    private password: string;

    constructor(username?: string, password?: string) {
        this.username = (username) ? username : null;
        this.password = (password) ? password : null;
    }

    public getUsername(): string {
        return this.username;
    }

    public getPassword(): string {
        return this.password;
    }
}