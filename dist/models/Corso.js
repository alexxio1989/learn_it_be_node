"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Corso = void 0;
const Dominio_1 = require("./Dominio");
const SubDominio_1 = require("./SubDominio");
class Corso {
    constructor() {
        this.lezioni = [];
        this.feeds = [];
        this.nomeCorso = '';
        this.descrizioneCorso = '';
        this.tipo = new SubDominio_1.SubDominio();
        this.tipoPadre = new Dominio_1.Dominio();
    }
}
exports.Corso = Corso;
//# sourceMappingURL=Corso.js.map