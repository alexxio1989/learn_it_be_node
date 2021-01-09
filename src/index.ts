import Express from "express";
import mysql from 'mysql';
import cors from 'cors';
import { LezioneCtrl } from "./controllers/LezioneCtrl";

const app = Express();

let lezioneCtrl= new LezioneCtrl();
app.use(Express.json());
app.use(Express.urlencoded( {extended : true} ))


app.use(cors({
    origin: '*'
  }));


const connection = mysql.createConnection({
    host     : 'shopux.coouthbw1pyt.eu-central-1.rds.amazonaws.com',
    user     : 'admin',
    password : 'Alessio07081989',
    database : 'learnit'
});

connection.connect((err: any) =>{
    if(err){
        throw err;
    }
    console.log("Mysql Connected ...")
})

const server = app.listen(process.env.PORT || 8000, function () {
    console.log("Listening on port http://localhost:8000");
});

app.get('/' , (req,res) => {
    res.send('Hello World')
});


app.post('/lezione/updateparagraph' , (req,res) => {
    lezioneCtrl.updateLastParagraph(req,res,connection);
});