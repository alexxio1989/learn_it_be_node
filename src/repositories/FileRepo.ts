import { Connection } from "mysql";
import { Subject, Observable } from "rxjs";
import { base64ToByteArray, chunkString } from "../utils/FileUtils";
import { FileLearnIt } from "../models/FileLearnIt";
import { FileResponse } from "../response/FileResponse";
import { IRepo } from "./core/IRepo";


export class FileRepo implements IRepo<FileResponse>{

    fileResponse = new FileResponse();

    iSubject: Subject<any> = new Subject();

    iSubjectOnComplete: Subject<any> = new Subject();

    finish: boolean;
    error: boolean;
    
    getOBSOnComplete(): Observable<any> {
        return this.iSubjectOnComplete.asObservable();
    }
    resetOBSOnComplete(){
        this.iSubjectOnComplete = new Subject();
    }

    getOBS(): Observable<any> {
        return this.iSubject.asObservable();
    }
    resetOBS(){
        this.iSubject = new Subject();
    }
    save(req: any, connection: Connection): void {
        let file : FileLearnIt;
        let sql = "INSERT INTO file (idpadre,type_padre,bytes,base_64,type_file,format,titolo,index_file) VALUES (?,?,?,?,?,?,?,?);";
        file = req.body;
        const lenghtbase64 = file.base64.length
        const subBase64 = chunkString(file.base64,lenghtbase64 / 10);
        let count = 0;
        console.log(subBase64.length)
        this.getOBSOnComplete().subscribe(next => {
            this.fileResponse.httpStatus = 200;
            this.fileResponse.status = "Insert avvenuto con successo";
            this.iSubject.next(this.fileResponse)
        },error=>{
            this.fileResponse.httpStatus = 500;
            this.fileResponse.status = "Insert in errore";
            throw error;
        })

        subBase64.forEach(element => {
            const index = subBase64.indexOf(element)
            const params = [file.idPadre, file.typePadre,null,element,file.typeFile,file.formato,file.titolo,index];
            
            const result = connection.query(sql, params, (err: any, result: any) => {
                count = count + 1;
                if (err) {
                    this.iSubjectOnComplete.error;
                }
                if(count === subBase64.length){
                    this.iSubjectOnComplete.next(true);
                }
                
            })
            
        });
    }
    update(req: any, connection: Connection): void {
        throw new Error("Method not implemented.");
    }
    get(req: any, connection: Connection): void {
        throw new Error("Method not implemented.");
    }
    delete(req: any, connection: Connection): void {
        let file : FileLearnIt;
        let sql ="DELETE FROM file WHERE idtable1 = ?";
    }
    getAll(req: any, connection: Connection): void {
        let file : FileLearnIt;
        let sql = "SELECT * from file WHERE idpadre = ? AND type_padre = ?";
    }

}