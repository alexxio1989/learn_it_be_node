"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsoRepo = void 0;
const rxjs_1 = require("rxjs");
const CorsoResponse_1 = require("../response/CorsoResponse");
class CorsoRepo {
    constructor() {
        this.corsoResponse = new CorsoResponse_1.CorsoResponse();
        this.iSubject = new rxjs_1.Subject();
    }
    getOBS() {
        return this.iSubject.asObservable();
    }
    resetOBS() {
        this.iSubject = new rxjs_1.Subject();
    }
    save(req, connection) {
        throw new Error("Method not implemented.");
    }
    update(req, connection) {
        throw new Error("Method not implemented.");
    }
    get(req, connection) {
        throw new Error("Method not implemented.");
    }
    delete(req, connection) {
        throw new Error("Method not implemented.");
    }
    getAll(req, connection) {
        throw new Error("Method not implemented.");
    }
    updateVisibilityCorso(req, connection) {
        let corso;
        let sql = "UPDATE corso SET enable = ? WHERE idcorso = ?";
        corso = req.body;
        const params = [corso.enable, corso.id];
        const result = connection.query(sql, params, (err, result) => {
            if (err) {
                this.corsoResponse.httpStatus = 500;
                this.corsoResponse.status = "Update in errore";
                throw err;
            }
            this.corsoResponse.httpStatus = 200;
            this.corsoResponse.status = "Update avvenuto con successo";
            this.iSubject.next(this.corsoResponse);
        });
    }
}
exports.CorsoRepo = CorsoRepo;
//# sourceMappingURL=CorsoRepo.js.map