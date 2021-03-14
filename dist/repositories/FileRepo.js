"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRepo = void 0;
const rxjs_1 = require("rxjs");
const FileUtils_1 = require("../utils/FileUtils");
const FileLearnIt_1 = require("../models/FileLearnIt");
const FileResponse_1 = require("../response/FileResponse");
class FileRepo {
    constructor() {
        this.fileResponse = new FileResponse_1.FileResponse();
        this.iSubject = new rxjs_1.Subject();
        this.iSubjectOnComplete = new rxjs_1.Subject();
    }
    getOBSOnComplete() {
        return this.iSubjectOnComplete.asObservable();
    }
    resetOBSOnComplete() {
        this.iSubjectOnComplete = new rxjs_1.Subject();
    }
    getOBS() {
        return this.iSubject.asObservable();
    }
    resetOBS() {
        this.iSubject = new rxjs_1.Subject();
    }
    save(req, connection) {
        this.fileResponse = new FileResponse_1.FileResponse();
        let file;
        let sql = "INSERT INTO video (bytes,base_64,type_file,format,titolo,index_file,lezione_idlezione) VALUES (?,?,?,?,?,?,?);";
        file = req.body;
        const lenghtbase64 = file.base64.length;
        const subBase64 = FileUtils_1.chunkString(file.base64, lenghtbase64 / 10);
        let count = 0;
        console.log(subBase64.length);
        this.getOBSOnComplete().subscribe(next => {
            this.fileResponse.httpStatus = 200;
            this.fileResponse.status = "Insert avvenuto con successo";
            this.iSubject.next(this.fileResponse);
        }, error => {
            this.fileResponse.httpStatus = 500;
            this.fileResponse.status = "Insert in errore";
            throw error;
        });
        subBase64.forEach(element => {
            const index = subBase64.indexOf(element);
            const params = [null, element, file.typeFile, file.formato, file.titolo, index, file.idLezione];
            const result = connection.query(sql, params, (err, result) => {
                count = count + 1;
                if (err) {
                    this.iSubjectOnComplete.error;
                }
                if (count === subBase64.length) {
                    this.iSubjectOnComplete.next(true);
                }
            });
        });
    }
    update(req, connection) {
        throw new Error("Method not implemented.");
    }
    get(req, connection) {
        this.fileResponse = new FileResponse_1.FileResponse();
        let fileInput;
        let fileOut = new FileLearnIt_1.FileLearnIt();
        fileInput = req.body;
        let sql = "SELECT * from video WHERE lezione_idlezione = ?";
        const params = [fileInput.idLezione];
        const result = connection.query(sql, params, (err, result) => {
            if (err) {
                this.fileResponse.httpStatus = 500;
                this.fileResponse.status = "Recupero in errore";
                throw err;
            }
            let files = [];
            files = result;
            let base64 = '';
            if (files !== undefined && files !== null && files.length > 0) {
                const fileFromDB = files[0];
                fileOut.idLezione = fileFromDB.lezione_idlezione;
                fileOut.id = fileFromDB.idtable1;
                fileOut.typeFile = fileFromDB.type_file;
                fileOut.formato = fileFromDB.format;
                fileOut.titolo = fileFromDB.titolo;
                let base64 = fileFromDB.format;
                files.forEach((element) => {
                    base64 = base64 + element.base_64;
                });
                fileOut.base64 = base64;
                this.fileResponse.obj = fileOut;
            }
            this.fileResponse.httpStatus = 200;
            this.iSubject.next(this.fileResponse);
        });
    }
    delete(req, connection) {
        this.fileResponse = new FileResponse_1.FileResponse();
        let file;
        file = req.body;
        let sql = "DELETE FROM video WHERE lezione_idlezione = ?";
        const params = [file.idLezione];
        const result = connection.query(sql, params, (err, result) => {
            if (err) {
                this.fileResponse.httpStatus = 500;
                this.fileResponse.status = "Eliminazione in errore";
                throw err;
            }
            this.fileResponse.httpStatus = 200;
            this.fileResponse.status = "Eliminazione avvenuta con successo";
            this.iSubject.next(this.fileResponse);
        });
    }
    getAll(req, connection) {
        throw new Error("Method not implemented.");
    }
}
exports.FileRepo = FileRepo;
//# sourceMappingURL=FileRepo.js.map