import * as bodyParser from "body-parser";
import chalk from "chalk";
import * as cookieParser from "cookie-parser";
import errorHandler = require("errorhandler");
import * as express from "express";
import methodOverride = require("method-override");
import * as logger from "morgan";
import * as path from "path";
import { IndexRoute } from "./routes/index";

/**
 * The server.
 *
 * @class Server
 */
export class Server {
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

  public app: express.Application;

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    // create expressjs application
    this.app = express();

    // configure application
    this.config();

    // add routes
    this.routes();

    // add api
    this.api();
  }

  /**
   * Create REST routes
   *
   * @class Server
   * @method api
   */
  public api() {
    // empty for now
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {
    // add static paths
    this.app.use(express.static(path.join(__dirname, "static")));

    // configure pug
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "pug");

    // use logger middlware
    this.app.use(logger(`${chalk.blueBright("[mock]")} :method :url :status :res[content-length] - :response-time ms`));

    // use json form parser middlware
    this.app.use(bodyParser.json());

    // use query string parser middlware
    this.app.use(bodyParser.urlencoded({
      extended: true,
    }));

    // use cookie parser middleware
    this.app.use(cookieParser("SECRET_GOES_HERE"));

    // use override middlware
    this.app.use(methodOverride());

    // catch 404 and forward to error handler
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      err.status = 404;
      next(err);
    });

    // error handling
    this.app.use(errorHandler());
  }

  /**
   * Create router
   *
   * @class Server
   * @method api
   */
  public routes() {
    let router: express.Router;
    router = express.Router();
    IndexRoute.create(router);
    this.app.use(router);
  }
}
