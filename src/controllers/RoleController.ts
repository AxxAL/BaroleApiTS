import { Request, Response } from "express";
import { isAuthorized } from "../middleware/Authentication";
import Role from "../models/Role";
import Controller from "./Controller";

export default class RoleController extends Controller {

    constructor() {
        super("/role");
    }

    private getAllRoles(req: Request, res: Response) {
        Role.find({}, {
            __v: 0
        })
            .then(roles => res.send(roles))
            .catch(error => res.status(500).send({ error }));
    }

    private async getRoleById(req: Request, res: Response) {
        const { id } = req.params;

        Role.findById(id, {
            __v: 0
        })
            .then(role => res.send(role))
            .catch(error => res.status(500).send({ error }));
    }

    private async getRoleByTitle(req: Request, res: Response) {
        const { title } = req.params;

        try {
            const role = await Role.find({ title: { $regex: title, $options: "i" } });
            
            if (!role) {
                return res.status(404).send({ error: "Role not found" });
            }
            return res.send(role);
        } catch (error) {
            return res.status(500).send({ error });
        }
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

    private async deleteRole(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const result = await Role.findByIdAndDelete(id);
            if (!result) {
                return res.status(404).send({ error: "Role not found" });
            }
            return res.send(result);
        } catch(error) {
            return res.status(500).send({ error });
        }
    }

    protected configureRoutes(): void {
        console.log("Initializing routes for RoleController");
        this.addRouteGet("id/:id", this.getRoleById);
        this.addRouteGet("titleSearch/:title", this.getRoleByTitle);
        this.addRouteGet("all", this.getAllRoles);
        this.addRoutePost("create", this.createRole, [ isAuthorized ]);
        this.addRouteDelete("delete/:id", this.deleteRole, [ isAuthorized ]);
    }
}