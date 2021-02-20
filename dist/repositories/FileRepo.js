"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRepo = void 0;
const rxjs_1 = require("rxjs");
const FileUtils_1 = require("../utils/FileUtils");
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
        let file;
        let sql = "INSERT INTO file (idpadre,type_padre,bytes,base_64,type_file,format,titolo,index_file) VALUES (?,?,?,?,?,?,?,?);";
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
            const params = [file.idPadre, file.typePadre, null, element, file.typeFile, file.formato, file.titolo, index];
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
        throw new Error("Method not implemented.");
    }
    delete(req, connection) {
        let file;
        let sql = "DELETE FROM file WHERE idtable1 = ?";
    }
    getAll(req, connection) {
        let file;
        let sql = "SELECT * from file WHERE idpadre = ? AND type_padre = ?";
    }
}
exports.FileRepo = FileRepo;
//# sourceMappingURL=FileRepo.js.map