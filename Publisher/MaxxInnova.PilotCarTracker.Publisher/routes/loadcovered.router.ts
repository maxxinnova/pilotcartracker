import { Router, Request, Response, NextFunction } from "express"
import { webhook } from "twilio"
import { LoadCoveredController } from "../controllers/loadcovered.controller";

class LoadCoveredRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.get("/", async (req: Request, res: Response) => {
            try {
                const controller = new LoadCoveredController({ request: req, response: res });
                await controller.get();
            } catch (e) {

            }
        });

        this.router.get("/:id", async (req: Request, res: Response) => {
            try {
                const controller = new LoadCoveredController({ request: req, response: res });
                await controller.get(req.query.id);
            } catch (e) {

            }
        });

        this.router.post("/", webhook({ validate: false }), async (req: Request, res: Response) => {
            try {
                const controller = new LoadCoveredController({ request: req, response: res });
                await controller.post(req.body);
            } catch (e) {

            }
        });
    }
}

const loadcoveredRouter = new LoadCoveredRouter();

export default loadcoveredRouter.router;
