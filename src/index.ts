import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import multer from 'multer'
import cors from "cors";
import path from 'path'
import {MainApi} from "./routes";
import {MongoDb } from "./config/mongodb.conn";
import { Server } from "http";
import formData from 'express-form-data'
import os from 'os'
import cookieparser from "cookie-parser"

const health = require('@cloudnative/health-connect');
const upload = multer()
let healthcheck = new health.HealthChecker();
import { MONGO_CLUSTER,MONGO_DbName,MONGO_pass,MONGO_user_name } from "./utils/constants";
let server: Server | null = null;
const PORT = process.env.PORT || 8000;
function initApplication(): express.Application {
    new MongoDb().connect(MONGO_CLUSTER,MONGO_DbName,MONGO_user_name,MONGO_pass);
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}))
    app.use(morgan("tiny"));
    
    app.use(express.static("public"));
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        }
    }));
    const pth = path.join(`${__dirname}\\publi`)
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}))
    const options = {
        uploadDir: pth,
        autoClean: false
      };
    app.use(formData.parse(options));
    app.use(cookieparser())
    app.use(MainApi);
    app.use(
        (err: any, req: Request, res: Response, next: NextFunction) => {
            res.locals.message = err.message;
            const status = err.statusCode || 500;
            res.locals.status = status;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            res.status(status);
            return res.json({
                error: {
                    message: err.message
                }
            });
        }
    );
    app.use('/health', health.LivenessEndpoint(healthcheck))
    app.use('/ready', health.ReadinessEndpoint(healthcheck));
    return app;
}
function start() {
    const app = initApplication();

    server = app.listen(process.env.PORT || PORT, () => {
        console.log(`Server started on PORT:`+ PORT);
    });
}
// Start the application
start();