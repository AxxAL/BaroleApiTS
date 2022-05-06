import { Request, Response } from "express";
import User from "../models/User";
import config from "../Config";
import Controller from "./Controller";
import { sign } from "jsonwebtoken";
import { isAuthorized } from "../middleware/Authentication";

export default class UserController extends Controller {
    
    constructor() {
        super("/user");
    }

    private async createUser(req: Request, res: Response) {
        const { username, password } = req.body;

        if (await User.findOne({ username })) {
            return res.status(400).send({ error: "User already exists" });
        }

        const user = new User({ username, password });

        try {
            const result = await user.save();
            
            const token = sign({ username, password }, config.SECRET, { expiresIn: "4h" });

            return res.send({
                data: result,
                token
            });
        } catch(error) {
            console.log(error);
            res.status(500).send({ error: "Failed to create user" });
        }
    }

    private async deleteUser(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const result = await User.findByIdAndDelete(id);
            if (!result) {
                return res.status(404).send({ error: "User not found" });
            }
            return res.send(result);
        } catch(error) {
            return res.status(500).send({ error });
        }
    }

    private async authenticateUser(req: Request, res: Response) {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(401).send({ error: "Invalid credentials" });
            }

            const passwordsMatch = await user.validatePassword(password);

            if (!passwordsMatch) {
                return res.status(401).send({ error: "Invalid credentials" });
            }

            const token = sign(req.body, config.SECRET, { expiresIn: "4h" });

            return res.send({
                data: user,
                token
            });

        } catch(error) {
            console.log(error);
            return res.status(500).send({ error: "Failed to authenticate user" });
        }
    }

    protected configureRoutes(): void {
        console.log("Initializing routes for UserController");
        this.addRoutePost("create", this.createUser, [ isAuthorized ]);
        this.addRouteDelete("delete/:id", this.deleteUser, [ isAuthorized ]);
        this.addRoutePost("auth", this.authenticateUser);
    }
}