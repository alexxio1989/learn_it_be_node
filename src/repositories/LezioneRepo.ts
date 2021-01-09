import { Connection } from "mysql";
import { Subject, Observable } from "rxjs";
import { Lezione } from "../models/Lezione";
import { Paragrafo } from "../models/Paragrafo";
import { LezioneResponse } from "../response/LezioneResponse";
import { IRepo } from "./core/IRepo";


export class LezioneRepo implements IRepo<LezioneResponse>{
    lezioneResponse = new LezioneResponse();
    iSubject: Subject<any> = new Subject();
    save(req: any, connection: Connection): Observable<any> {
        throw new Error("Method not implemented.");
    }
    update(req: any, connection: Connection): Observable<any> {
        throw new Error("Method not implemented.");
    }
    get(req: any, connection: Connection): Observable<any> {
        throw new Error("Method not implemented.");
    }
    delete(req: any, connection: Connection): Observable<any> {
        throw new Error("Method not implemented.");
    }
    getAll(req: any, connection: Connection): Observable<any> {
        throw new Error("Method not implemented.");
    }

    updateLastParagraph(req: any, connection: Connection): Observable<any>{
        let lezione: Lezione;
        let paragraph : Paragrafo;
        let sql = "UPDATE lezione SET last_parag_id = ? WHERE idlezione = ?";
        lezione = req.body.lezione;
        paragraph = req.body.paragrafo;
        const params = [paragraph.idComponent , lezione.id];
        const result = connection.query(sql, params, (err: any, result: any) => {
            if (err) {
                this.lezioneResponse.httpStatus = 500;
                this.lezioneResponse.status = "Salvataggio in errore";
                throw err;
            }
            this.lezioneResponse.httpStatus = 200;
            this.lezioneResponse.status = "Salvataggio avvenuto con successo";
            this.iSubject.next(this.lezioneResponse)
        })

        return this.iSubject;
    }


}