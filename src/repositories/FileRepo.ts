import { Connection } from "mysql";
import { Subject, Observable } from "rxjs";
import { arrayToBase64, base64ToByteArray, chunkArray, chunkString } from "../utils/FileUtils";
import { FileLearnIt } from "../models/FileLearnIt";
import { FileResponse } from "../response/FileResponse";
import { IRepo } from "./core/IRepo";
import { isArrayValid, isStringValid } from "../utils/Utils";


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
        this.fileResponse = new FileResponse();
        let file : FileLearnIt;
        let sql = "INSERT INTO video (bytes,base_64,type_file,format,titolo,index_file,lezione_idlezione) VALUES (?,?,?,?,?,?,?);";
        file = req.body;
        let count = 0;
        this.getOBSOnComplete().subscribe(next => {
            this.fileResponse.httpStatus = 200;
            this.fileResponse.status = "Insert avvenuto con successo";
            this.iSubject.next(this.fileResponse)
        },error=>{
            this.fileResponse.httpStatus = 500;
            this.fileResponse.status = "Insert in errore";
            throw error;
        })

        if(isStringValid(file.base64)){
            const lenghtbase64 = file.base64.length
            const subBase64 = chunkString(file.base64,lenghtbase64 / 10);
    
            subBase64.forEach(element => {
                const index = subBase64.indexOf(element)
                const params = [null,element,file.typeFile,file.formato,file.titolo,index,file.idLezione];
                
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

        if(isArrayValid(file.bytes)){
            const base64 = arrayToBase64(file.bytes);
            const subBytes = chunkArray(file.bytes , file.bytes.length / 10);
            subBytes.forEach(element => {
                
                const format  = 'data:' + file.typeFile + ';base64,';
                const buffer = Buffer.from(element);
                const params = [ buffer , '' , file.typeFile , format , file.titolo , 0 , file.idLezione ];
                
                const result = connection.query(sql, params, (err: any, result: any) => {
                    count = count + 1;
                    if (err) {
                        this.iSubjectOnComplete.error;
                    }
                    if(count === subBytes.length){
                        this.iSubjectOnComplete.next(true);
                    }
                    
                })
                
            });
        }

    }
    update(req: any, connection: Connection): void {
        throw new Error("Method not implemented.");
    }
    get(req: any, connection: Connection): void {
        this.fileResponse = new FileResponse();
        let fileInput : FileLearnIt;
        let fileOut = new FileLearnIt();
        fileInput = req.body;
        let sql = "SELECT * from video WHERE lezione_idlezione = ?";

        const params = [fileInput.idLezione];

        const result = connection.query(sql, params, (err: any, result: any) => {
           
            if (err) {
                this.fileResponse.httpStatus = 500;
                this.fileResponse.status = "Recupero in errore";
                throw err;
            }

           let files = [];
           files = result;

            let base64 = '';
            if(files !== undefined && files !== null && files.length > 0){

                const fileFromDB = files[0];
                fileOut.idLezione = fileFromDB.lezione_idlezione;
                fileOut.id = fileFromDB.idtable1;
                fileOut.typeFile = fileFromDB.type_file;
               
                fileOut.titolo = fileFromDB.titolo;
               
                if(isArrayValid(fileFromDB.bytes)){
                    let bytesTot:any[] = [];
                    let bytesBase:any[] = [];
                    files.forEach((element: any) => {
                        let arr = Array.prototype.slice.call(element.bytes);
                       
                        if(isArrayValid(bytesTot)){
                            bytesTot = [...bytesTot, ...arr];
                        } else {
                            bytesTot = arr
                        }
                      
                    });

                    let format  = 'data:' + fileFromDB.type_file + ';base64,';
                    const base64 = arrayToBase64(bytesTot);

                    fileOut.formato = format;
                    fileOut.base64 =format+base64
                } 

                if(isStringValid(fileFromDB.base_64)){
                    fileOut.formato = fileFromDB.format;
                    let base64 = fileFromDB.format;
                    files.forEach((element: any) => {
                        base64 = base64 + element.base_64;
                    });
                    fileOut.base64 = base64;

                }

                this.fileResponse.obj = fileOut;
            } 
            
            this.fileResponse.httpStatus = 200;
            this.iSubject.next(this.fileResponse);
            
        })
    }


    delete(req: any, connection: Connection): void {
        this.fileResponse = new FileResponse();
        let file : FileLearnIt;
        file = req.body;
        let sql ="DELETE FROM video WHERE lezione_idlezione = ?";

        const params = [file.idLezione];

        const result = connection.query(sql, params, (err: any, result: any) => {
           
            if (err) {
                this.fileResponse.httpStatus = 500;
                this.fileResponse.status = "Eliminazione in errore";
                throw err;
            }
           
            this.fileResponse.httpStatus = 200;
            this.fileResponse.status = "Eliminazione avvenuta con successo"
            this.iSubject.next(this.fileResponse);

            
        })
    }

    
    getAll(req: any, connection: Connection): void {
        throw new Error("Method not implemented.");
    }

}