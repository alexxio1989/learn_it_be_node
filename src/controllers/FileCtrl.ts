import { Connection } from "mysql";
import { FileResponse } from "../response/FileResponse";
import { FileRepo } from "../repositories/FileRepo";
import { ICtrl } from "./core/ICtrl";


export class FileCtrl implements ICtrl {

    fileRepo = new FileRepo();

    save(req: any, res: any, connection: Connection): void {
        let fileResponse: FileResponse;
        let sent = false;
        this.fileRepo.save(req,connection);
        this.fileRepo.getOBS().subscribe(next => {
            fileResponse = next;
            if(fileResponse !== undefined){
                if(!sent){
                    sent = true;
                    this.fileRepo.resetOBS();
                    return res.status(fileResponse.httpStatus).send(fileResponse);
                }
            }
        });
    }
    update(req: any, res: any, connection: Connection): void {
        throw new Error("Method not implemented.");
    }
    get(req: any, res: any, connection: Connection): void {
        throw new Error("Method not implemented.");
    }
    delete(req: any, res: any, connection: Connection): void {
        let fileResponse: FileResponse;
        let sent = false;
        this.fileRepo.delete(req,connection);
        this.fileRepo.getOBS().subscribe(next => {
            fileResponse = next;
            if(fileResponse !== undefined){
                if(!sent){
                    sent = true;
                    this.fileRepo.resetOBS();
                    return res.status(fileResponse.httpStatus).send(fileResponse);
                }
            }
        });
    }
    getAll(req: any, res: any, connection: Connection): void {
        let fileResponse: FileResponse;
        let sent = false;
        this.fileRepo.getAll(req,connection);
        this.fileRepo.getOBS().subscribe(next => {
            fileResponse = next;
            if(fileResponse !== undefined){
                if(!sent){
                    sent = true;
                    this.fileRepo.resetOBS();
                    return res.status(fileResponse.httpStatus).send(fileResponse);
                }
            }
        });
    }

}