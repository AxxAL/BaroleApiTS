import { Request, Response } from "express";
import Role from "../models/Role";
import Controller from "./Controller";

export default class RoleController extends Controller {

    constructor() {
        super("/role");
        this.initializeRoutes();
    }

    private getAllRoles(req: Request, res: Response) {
        Role.find({}, {
            __v: 0
        })
            .then(roles => res.send(roles))
            .catch(error => res.status(500).send({ error }));
    }

    private async createRole(req: Request, res: Response) {
        const role = new Role(req.body);

        try {
            const result = await role.save();
            res.send(result);
        } catch(error) {
            res.status(500).send({ error });
        }
    }

    public initializeRoutes() {
        console.log("Initializing routes for RoleController");
        this.addRouteGet("all", this.getAllRoles);
        this.addRoutePost("create", this.createRole);
    }
}