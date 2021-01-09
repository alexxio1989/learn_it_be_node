import { Connection } from "mysql";
import { LezioneRepo } from "../repositories/LezioneRepo";
import { ICtrl } from "./core/ICtrl";


export class LezioneCtrl implements ICtrl {

    lezioneRepo = new LezioneRepo();

    save(req: any, res: any, connection: Connection): void {
        throw new Error("Method not implemented.");
    }
    update(req: any, res: any, connection: Connection): void {
        throw new Error("Method not implemented.");
    }
    get(req: any, res: any, connection: Connection): void {
        throw new Error("Method not implemented.");
    }
    delete(req: any, res: any, connection: Connection): void {
        throw new Error("Method not implemented.");
    }
    getAll(req: any, res: any, connection: Connection): void {
        throw new Error("Method not implemented.");
    }

    updateLastParagraph(req: any, res: any, connection: Connection): void {
        this.lezioneRepo.updateLastParagraph(req,connection).subscribe(next => {
            res.status(next.httpStatus).send(next);
        });
    }

}