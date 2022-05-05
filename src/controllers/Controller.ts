import Router, { json } from "express";

export default abstract class Controller {
    private path: String;
    private router = Router();

    constructor(path: String) {
        this.path = path;
        this.configureRoutes();
    }

    protected addRouteGet(endpoint: String, callback: any, middleware: any = []) {
        const fullPath: string = `${this.path}/${endpoint}`;
        this.router.get(fullPath, middleware, callback);
        console.log(`Registered GET endpoint: /api/v1${fullPath}`);
    }

    protected addRoutePost(endpoint: String, callback: any, middleware: any = []) {
        middleware.push(json());

        const fullPath: string = `${this.path}/${endpoint}`;
        this.router.post(fullPath, middleware, callback);
        console.log(`Registered POST endpoint: /api/v1${fullPath}`);
    }

    public getRouter() {
        return this.router;
    }

    public getPath() {
        return this.path;
    }

    protected abstract configureRoutes(): void;
}