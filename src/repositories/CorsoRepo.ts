

import { Connection } from "mysql";
import { Subject, Observable } from "rxjs";
import { CorsoResponse } from "../response/CorsoResponse";
import { Corso } from "../models/Corso";
import { Lezione } from "../models/Lezione";
import { Paragrafo } from "../models/Paragrafo";
import { LezioneResponse } from "../response/LezioneResponse";
import { IRepo } from "./core/IRepo";


export class CorsoRepo implements IRepo<LezioneResponse>{
    corsoResponse = new CorsoResponse();

    iSubject: Subject<any> = new Subject();

    getOBS(): Observable<any> {
        return this.iSubject.asObservable();
    }
    resetOBS(){
        this.iSubject = new Subject();
    }
    save(req: any, connection: Connection): void {
        throw new Error("Method not implemented.");
    }
    update(req: any, connection: Connection): void {
        throw new Error("Method not implemented.");
    }
    get(req: any, connection: Connection): void {
        throw new Error("Method not implemented.");
    }
    delete(req: any, connection: Connection): void {
        throw new Error("Method not implemented.");
    }
    getAll(req: any, connection: Connection): void {
        throw new Error("Method not implemented.");
    }

    updateVisibilityCorso(req: any, connection: Connection): void{
        let corso: Corso;
        let sql = "UPDATE corso SET enable = ? WHERE idcorso = ?";
        corso = req.body;
        const params = [corso.enable, corso.id];
        const result = connection.query(sql, params, (err: any, result: any) => {
            if (err) {
                this.corsoResponse.httpStatus = 500;
                this.corsoResponse.status = "Update in errore";
                throw err;
            }
            this.corsoResponse.httpStatus = 200;
            this.corsoResponse.status = "Update avvenuto con successo";
            this.iSubject.next(this.corsoResponse)
        })
    }


}