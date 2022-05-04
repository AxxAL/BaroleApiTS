import { Request, Response } from "express";
import User from "../models/User";
import Controller from "./Controller";
import { sign } from "jsonwebtoken";

export default class UserController extends Controller {

    private secret: string;
    
    constructor() {
        super("/user");
        this.secret = process.env.SECRET as string;
        this.initializeRoutes();
    }

    private async createUser(req: Request, res: Response) {
        const user = new User(req.body);

        try {
            const result = await user.save();
            res.send(result);
        } catch(error) {
            res.status(500).send({ error });
        }
    }

    private async authenticateUser(req: Request, res: Response) {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(401).send({ error: "User not found" });
            }

            if (await user.validatePassword(password)) {
                return sign(user, this.secret, { expiresIn: "4h" });
            }

        } catch(error) {
            return res.status(500).send({ error });
        }
    }

    public initializeRoutes() {
        console.log("Initializing routes for UserController");
        this.addRoutePost("create", this.createUser);
        this.addRoutePost("auth", this.authenticateUser);
    }
}