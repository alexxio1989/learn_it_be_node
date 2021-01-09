import {Code } from './Code';
export class Paragrafo{
    id: number;
    titolo: string;
    content: string;
    completato: string;
    idlezione: number;
    idComponent: string;
    edit: boolean;
    codes: Code[];
}