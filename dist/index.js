"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const cors_1 = __importDefault(require("cors"));
const LezioneCtrl_1 = require("./controllers/LezioneCtrl");
const CorsoCtrl_1 = require("./controllers/CorsoCtrl");
const app = express_1.default();
let lezioneCtrl = new LezioneCtrl_1.LezioneCtrl();
let corsoCtrl = new CorsoCtrl_1.CorsoCtrl();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default({
    origin: '*'
}));
const connection = mysql_1.default.createConnection({
    host: 'shopux.coouthbw1pyt.eu-central-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Alessio07081989',
    database: 'learnit'
});
connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Mysql Connected ...");
});
const server = app.listen(process.env.PORT || 8000, function () {
    console.log("Listening on port http://localhost:8000");
});
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.post('/lezione/updateparagraph', (req, res) => {
    lezioneCtrl.updateLastParagraph(req, res, connection);
});
app.post('/corso/updateVisibilityCorso', (req, res) => {
    corsoCtrl.updateVisibilityCorso(req, res, connection);
});
//# sourceMappingURL=index.js.map