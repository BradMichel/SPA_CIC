import { isNullOrUndefined } from 'util';
import { Api } from './api';

export class Activo {

    public exists: boolean;
    private _id: number;
    private _nombre: string;
    private _longitud: number;
    private _diametro: number;
    private _fecha: Date;

    constructor(activo?: any) {

        // this.id = 0
        this.nombre = ''
        // this.longitud = 0
        // this.diametro = 0
        // this.fecha = new Date()
        this.exists = false

        if (!isNullOrUndefined(activo)) {
            this.set(activo)
        }
    }

    public set(json: Activo) {

        this.id = (!isNullOrUndefined(json._id)) ? json._id : json.id

        this.nombre = (!isNullOrUndefined(json._nombre)) ? json._nombre : json.nombre

        this.longitud = (!isNullOrUndefined(json._longitud)) ? json._longitud : json.longitud

        this.diametro = (!isNullOrUndefined(json._diametro)) ? json._diametro : json.diametro

        this.fecha = (!isNullOrUndefined(json._fecha)) ? new Date(json._fecha) : json.fecha

    }

    public load(callback: (json: any) => void) {

        const api = new Api()

        const handler = (json: Activo) => {

            this.set(json)            
            this.exists = (isNullOrUndefined(this.nombre)) ? false : true
            callback(this)
        }

        const handleError = (err: any) => {
            console.log(err);

        }

        handler.bind(this)
        handleError.bind(this)

        api.get(this, handler, handleError)

    }

    public save(callback: (json: any) => void) {
        const api = new Api()

        const handler = (json: any) => {
            console.log(json);
            this.set(json)
            callback(this)

        }

        const handleError = (err: any) => {
            console.log(err);

        }

        handler.bind(this)
        handleError.bind(this)

        api.post(this, handler, handleError)
    }

    public isValid() {
        let isValid = true

        isValid = (this.exists) ? false : isValid

        isValid = (isNullOrUndefined(this.id) || (typeof (this.id) !== 'number') || this.id === 0) ? false : isValid

        isValid = (isNullOrUndefined(this.nombre) || this.nombre === '') ? false : isValid

        isValid = (isNullOrUndefined(this.longitud) || (typeof (this.longitud) !== 'number') || this.longitud === 0) ? false : isValid

        isValid = (isNullOrUndefined(this.diametro) || (typeof (this.diametro) !== 'number') || this.diametro === 0) ? false : isValid

        isValid = (isNullOrUndefined(this.fecha) || !(this.fecha instanceof Date)) ? false : isValid


        return isValid
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = +value;
    }
    public get nombre(): string {
        return this._nombre;
    }
    public set nombre(value: string) {
        this._nombre = value;
    }
    public get longitud(): number {
        return this._longitud;
    }
    public set longitud(value: number) {
        this._longitud = +value;
    }
    public get diametro(): number {
        return this._diametro;
    }
    public set diametro(value: number) {
        this._diametro = +value;
    }
    public get fecha(): Date {
        return this._fecha;
    }
    public set fecha(value: Date) {
        this._fecha = value;
    }

    public get json() {
        return JSON.stringify({
            id: this.id,
            nombre: this.nombre,

        })
    }
}