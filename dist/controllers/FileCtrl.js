"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileCtrl = void 0;
const FileRepo_1 = require("../repositories/FileRepo");
class FileCtrl {
    constructor() {
        this.fileRepo = new FileRepo_1.FileRepo();
    }
    save(req, res, connection) {
        let fileResponse;
        let sent = false;
        this.fileRepo.save(req, connection);
        this.fileRepo.getOBS().subscribe(next => {
            fileResponse = next;
            if (fileResponse !== undefined) {
                if (!sent) {
                    sent = true;
                    this.fileRepo.resetOBS();
                    return res.status(fileResponse.httpStatus).send(fileResponse);
                }
            }
        });
    }
    update(req, res, connection) {
        throw new Error("Method not implemented.");
    }
    get(req, res, connection) {
        let fileResponse;
        let sent = false;
        this.fileRepo.get(req, connection);
        this.fileRepo.getOBS().subscribe(next => {
            fileResponse = next;
            if (fileResponse !== undefined) {
                if (!sent) {
                    sent = true;
                    this.fileRepo.resetOBS();
                    return res.status(fileResponse.httpStatus).send(fileResponse);
                }
            }
        });
    }
    delete(req, res, connection) {
        let fileResponse;
        let sent = false;
        this.fileRepo.delete(req, connection);
        this.fileRepo.getOBS().subscribe(next => {
            fileResponse = next;
            if (fileResponse !== undefined) {
                if (!sent) {
                    sent = true;
                    this.fileRepo.resetOBS();
                    return res.status(fileResponse.httpStatus).send(fileResponse);
                }
            }
        });
    }
    getAll(req, res, connection) {
        throw new Error("Method not implemented.");
    }
}
exports.FileCtrl = FileCtrl;
//# sourceMappingURL=FileCtrl.js.map