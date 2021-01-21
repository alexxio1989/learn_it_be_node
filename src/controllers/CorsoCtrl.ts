import { Connection } from "mysql";
import { CorsoResponse } from "../response/CorsoResponse";
import { CorsoRepo } from "../repositories/CorsoRepo";
import { ICtrl } from "./core/ICtrl";



export class CorsoCtrl implements ICtrl {

    corsoRepo = new CorsoRepo();

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

    updateVisibilityCorso(req: any, res: any, connection: Connection): void {
        let corsoResponse :CorsoResponse; 
        let sent = false;
        this.corsoRepo.updateVisibilityCorso(req,connection);
        this.corsoRepo.getOBS().subscribe(next => {
            corsoResponse = next;
            if(corsoResponse !== undefined){
                if(!sent){
                    sent = true;
                    this.corsoRepo.resetOBS();
                    return res.status(corsoResponse.httpStatus).send(corsoResponse);
                }
            }
        });
    }

}