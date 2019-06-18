import { Activo } from './activo';
import { Api } from './api';

export class Activos {

    private list: Map<number, Activo>

    constructor(){
        this.list = new Map()
    }

    public set(json: []) {

        for (const activoTemp of json) {

            const activo = new Activo(activoTemp)

            this.list.set(+activo.id, activo)
        }
    }

    public add(id: number, activo: Activo) {
        console.log(activo instanceof Activo);
        
        this.list.set(id, activo)
    }

    public load(callback: (json: []) => void) {

        const api = new Api()

        const handler = (json: []) => {
            this.set(json)
            callback(json)
        }

        const handleError = (error: any) => {
            console.log(error);
        }

        handler.bind(this)
        handleError.bind(this)

        api.get(this, handler, handleError)

    }

    public toString() {
        return JSON.stringify(this.list.values())
    }

    public get array() {
        return [...this.list.values()]
    }


}