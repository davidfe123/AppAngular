import { Hospital } from "./hospitales.model";

interface _MedicoUser{
    _id:string;
    nombre:string,
    img:string
}

export class Medico{
    
    constructor(
        public nombre: string,
        public _id?: string,
        public usuario?:_MedicoUser,
        public hospitales?: Hospital,
        public img?: string,
    ){
    }

}