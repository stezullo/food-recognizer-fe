export default class Endpoints {
    private static readonly HEROKU_ENABLED: boolean = true;
    private static readonly BASE_URL: string = (Endpoints.HEROKU_ENABLED) ? "https://food-recognizer-be.herokuapp.com" : "http://localhost:3000";
    static readonly IMAGE_RECOGNITION: string = Endpoints.BASE_URL + "/recognition";
    static readonly LOGIN: string = Endpoints.BASE_URL + "/auth/login";
}