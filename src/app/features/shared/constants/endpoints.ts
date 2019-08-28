export default class Endpoints {
    private static readonly BASE_URL: string = "http://localhost:3000";
    //private static readonly BASE_URL: string = "https://food-recognizer-be.herokuapp.com";
    static readonly IMAGE_RECOGNITION: string = Endpoints.BASE_URL + "/recognition";
    static readonly LOGIN: string = Endpoints.BASE_URL + "/auth/login";
}