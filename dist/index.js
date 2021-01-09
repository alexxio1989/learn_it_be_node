"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
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
//# sourceMappingURL=index.js.map