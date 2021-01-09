
import mysql from 'mysql';

export declare interface ICtrl{
    
    save(req: any, res: any , connection:mysql.Connection ): void;
    
    update(req: any, res: any , connection:mysql.Connection ): void;
    
    get(req: any, res: any , connection:mysql.Connection ): void;
  
    delete(req: any, res: any , connection:mysql.Connection ): void;
   
    getAll(req: any, res: any , connection:mysql.Connection ): void;

}