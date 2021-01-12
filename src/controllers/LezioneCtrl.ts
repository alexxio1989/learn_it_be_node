import { Connection } from "mysql";
import { LezioneResponse } from "../response/LezioneResponse";
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
        let lezioneResponse :LezioneResponse; 
        let sent = false;
        this.lezioneRepo.updateLastParagraph(req,connection);
        this.lezioneRepo.getOBS().subscribe(next => {
            lezioneResponse = next;
            if(lezioneResponse !== undefined){
                if(!sent){
                    sent = true;
                    this.lezioneRepo.resetOBS();
                    return res.status(lezioneResponse.httpStatus).send(lezioneResponse);
                }
            }
        });
    }

}