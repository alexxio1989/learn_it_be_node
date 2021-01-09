import { Paragrafo } from './Paragrafo';

export class Lezione {
    id: number;
    idCorso: number;
    indexLezione: number = 0;
    title: string = '';
    content: string;
    listaParagrafi: Paragrafo[] = [];
    idOwner: number;
}