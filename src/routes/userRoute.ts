import {Router, Request, Response, NextFunction} from "express";
import {default as User} from "../models/user";
import {IModel} from "../models/model";

export class UserRouter {
    router: Router;
    model: IModel;

    /**
     * init
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET all Heroes
     */
    public async getAll(req: Request, res: Response, next: NextFunction) {
        let users = await User.find().exec();
        res.send(users);
    }

    /**
     * GET one hero by id
     */
    public async getOne(req: Request, res: Response, next: NextFunction) {
        let query = req.params.id;
        let user = await User.find({_id: query}).exec();
        if (user && user.length !== 0) {
            res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                    user
                });
        } else {
            res.status(404)
                .send({
                    message: 'No user found with the given id.',
                    status: res.status
                });
        }
    }

    /**
     * Take each handler, and attach to one of the Express.Router's endpoints
     */
    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne)
    }
}

// Create the HeroRouter, and export its configured Express.Router
const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes;