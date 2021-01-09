"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LezioneCtrl = void 0;
const LezioneRepo_1 = require("../repositories/LezioneRepo");
class LezioneCtrl {
    constructor() {
        this.lezioneRepo = new LezioneRepo_1.LezioneRepo();
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
    updateLastParagraph(req, res, connection) {
        this.lezioneRepo.updateLastParagraph(req, connection).subscribe(next => {
            res.status(next.httpStatus).send(next);
        });
    }
}
exports.LezioneCtrl = LezioneCtrl;
//# sourceMappingURL=LezioneCtrl.js.map