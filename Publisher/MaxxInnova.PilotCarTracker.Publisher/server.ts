import * as bodyParser from "body-parser"
import * as cookieParser from "cookie-parser"
import * as express from "express"
import * as logger from "morgan"
import * as path from "path"
import * as errorHandler from "errorhandler"

var serveFavicon = require("serve-favicon");

import homeRouter from "./routes/home.router"
import loadcoveredRouter from "./routes/loadcovered.router"

export class Server {

    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //add routes
        this.routes();

        //add api
        this.api();
    }

    public api() {
        this.app.use("/api/loadcovered/message", loadcoveredRouter);
    }

    public config() {
        //add static paths
        this.app.use(express.static(path.join(__dirname, "public")));

        //configure handlebars
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "hbs");

        //favicon
        this.app.use(serveFavicon(__dirname + "/public/favicon.ico"));

        //mount logger
        this.app.use(logger("dev"));

        //mount json form parser
        this.app.use(bodyParser.json());

        //mount query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        //mount cookie parser middleware
        this.app.use(cookieParser("SECRET_GOES_HERE"));

        // catch 404 and forward to error handler
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());

        this.app.set("port", process.env["PORT"] || 3000);
    }

    private routes() {
        this.app.use("/", homeRouter);
    }
}
