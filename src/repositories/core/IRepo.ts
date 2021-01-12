
import mysql from 'mysql';
import {Subject , Observable} from 'rxjs';

export declare interface IRepo<T>{
    
    iSubject: Subject<T>;

    getOBS(): Observable<any>;

    
    save(req: any, connection:mysql.Connection ): void;
    
    update(req: any, connection:mysql.Connection ): void;
    
    get(req: any, connection:mysql.Connection ): void;
  
    delete(req: any, connection:mysql.Connection ): void;
   
    getAll(req: any, connection:mysql.Connection ): void;

}