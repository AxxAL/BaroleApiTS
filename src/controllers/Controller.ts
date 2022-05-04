import Router, { json } from "express";


export default class Controller {
    private path: String;
    private router = Router();

    constructor(path: String) {
        this.path = path;
    }

    protected addRouteGet(endpoint: String, callback: any) {
        this.router.get(`${this.path}/${endpoint}`, callback);
    }

    protected addRoutePost(endpoint: String, callback: any) {
        this.router.post(`${this.path}/${endpoint}`, json(), callback);
    }

    public getRouter() {
        return this.router;
    }

    public getPath() {
        return this.path;
    }
}