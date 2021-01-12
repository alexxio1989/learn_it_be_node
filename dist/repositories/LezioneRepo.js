"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LezioneRepo = void 0;
const rxjs_1 = require("rxjs");
const LezioneResponse_1 = require("../response/LezioneResponse");
class LezioneRepo {
    constructor() {
        this.lezioneResponse = new LezioneResponse_1.LezioneResponse();
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
    updateLastParagraph(req, connection) {
        let lezione;
        let paragraph;
        let sql = "UPDATE lezione SET last_parag_id = ? WHERE idlezione = ?";
        lezione = req.body.lezione;
        paragraph = req.body.paragrafo;
        const params = [paragraph.idComponent, lezione.id];
        const result = connection.query(sql, params, (err, result) => {
            if (err) {
                this.lezioneResponse.httpStatus = 500;
                this.lezioneResponse.status = "Salvataggio in errore";
                throw err;
            }
            this.lezioneResponse.httpStatus = 200;
            this.lezioneResponse.status = "Salvataggio avvenuto con successo";
            this.iSubject.next(this.lezioneResponse);
        });
    }
}
exports.LezioneRepo = LezioneRepo;
//# sourceMappingURL=LezioneRepo.js.map