import { Corso } from './Corso';

export class User{
    id: number;
    email: string;
    password: string;
    nome: string;
    cognome: string;
    corsiLetti: Corso[];
    propriCorsi: Corso[];
    
}