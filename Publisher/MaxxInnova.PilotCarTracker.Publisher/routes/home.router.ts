import { Router, Request, Response, NextFunction } from "express"
import { HomeController } from "../controllers/home.controller";

class HomeRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.get("/", async (req: Request, res: Response) => {
            var controller = new HomeController({ request: req, response: res });
            await controller.index();
        });
    }
}

var homeRouter = new HomeRouter();

export default homeRouter.router;
