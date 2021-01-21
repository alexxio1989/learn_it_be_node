"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsoCtrl = void 0;
const CorsoRepo_1 = require("../repositories/CorsoRepo");
class CorsoCtrl {
    constructor() {
        this.corsoRepo = new CorsoRepo_1.CorsoRepo();
    }
    save(req, res, connection) {
        throw new Error("Method not implemented.");
    }
    update(req, res, connection) {
        throw new Error("Method not implemented.");
    }
    get(req, res, connection) {
        throw new Error("Method not implemented.");
    }
    delete(req, res, connection) {
        throw new Error("Method not implemented.");
    }
    getAll(req, res, connection) {
        throw new Error("Method not implemented.");
    }
    updateVisibilityCorso(req, res, connection) {
        let corsoResponse;
        let sent = false;
        this.corsoRepo.updateVisibilityCorso(req, connection);
        this.corsoRepo.getOBS().subscribe(next => {
            corsoResponse = next;
            if (corsoResponse !== undefined) {
                if (!sent) {
                    sent = true;
                    this.corsoRepo.resetOBS();
                    return res.status(corsoResponse.httpStatus).send(corsoResponse);
                }
            }
        });
    }
}
exports.CorsoCtrl = CorsoCtrl;
//# sourceMappingURL=CorsoCtrl.js.map