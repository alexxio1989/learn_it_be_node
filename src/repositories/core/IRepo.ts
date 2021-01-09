
import mysql from 'mysql';
import {Subject , Observable} from 'rxjs';

export declare interface IRepo<T>{
    
    iSubject: Subject<T>;

    
    save(req: any, connection:mysql.Connection ): Observable<T>;
    
    update(req: any, connection:mysql.Connection ): Observable<T>;
    
    get(req: any, connection:mysql.Connection ): Observable<T>;
  
    delete(req: any, connection:mysql.Connection ): Observable<T>;
   
    getAll(req: any, connection:mysql.Connection ): Observable<T>;

}