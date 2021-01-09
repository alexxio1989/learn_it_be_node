import {SubDominio} from './SubDominio';

export class Dominio{
    id: number;
    codice: string;
    descrizione: string;
    sottoTipi: SubDominio[] = [];
}