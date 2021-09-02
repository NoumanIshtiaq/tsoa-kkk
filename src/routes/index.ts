import express from 'express';
import { DoctorRoutesApi } from "./Doctor.routes";
import {PatientRoutesApi} from "./Patient.routes"
export class MainRouter {
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {
        this.router.use('/doctor', DoctorRoutesApi);
        this.router.use('/patient', PatientRoutesApi)

    }


}
export const MainApi = new MainRouter().router;