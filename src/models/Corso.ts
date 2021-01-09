
import { Dominio } from './Dominio';
import { Feedback } from './Feedback';
import { Lettura } from './Lettura';
import { Lezione } from './Lezione';
import { SubDominio } from './SubDominio';
import { User } from './User';

export class Corso{
    id: number;
    owner: User;
    image: String;
    lezioni: Lezione[] = [];
    feeds: Feedback[] = [];
    nomeCorso: string = '';
    descrizioneCorso: string = '';
    tipo: SubDominio = new SubDominio();
    tipoPadre: Dominio= new Dominio();
    enable: boolean;
    prezzo: number;
    listLetture: Lettura[];
    stripeToken: string;
    acquirente: User;
}