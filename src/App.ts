import express, { Application } from "express";
import "dotenv/config";

import morgan from "morgan";
import cors from "cors";

import RoleController from "./controllers/RoleController";
import Controller from "./controllers/Controller";

export default class App {
    private app: Application;
    private port: number;

    private controllers: Array<Controller> = [
        new RoleController()
    ];

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT as string) || 3000;
    }

    private addMiddleware() {
        this.app.use(cors());
        this.app.use(morgan("dev"));
    }

    private addControllers() {
        for (const controller of this.controllers) {
            this.app.use("/api/v1", controller.getRouter());
        }
    }

    public run() {
        this.addMiddleware();
        this.addControllers();
        this.listen();
    }

    private listen() {
        this.app.listen(this.port, () => console.log(`Server started on http://localhost:${this.port}`));
    }
}