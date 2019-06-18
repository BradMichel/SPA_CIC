import { Activo } from './activo';
import { Activos } from './activos';

export class Api {
    private baseUrl: string

    constructor() {

        this.baseUrl = (process.env.NODE_ENV === "development") ? 'http://localhost:8080/api' : window.location.protocol + '//' + window.location.hostname + + '/api'

    }

    public get(model: any, callback: (json: any) => void, handleError: (err: any) => void) {

        const { url, handler } = this.getRoute(model)
        const options = { method: 'GET' }

        handler(url, options, callback, handleError)

    }

    public post(model: any, callback: (json: any) => void, handleError: (err: any) => void) {

        const { url, handler } = this.getRoute(model)
        const body = JSON.stringify(model)
        const options = { method: 'POST', body}

        console.log({options});
        

        handler(url, options, callback, handleError)

    }

    private getRoute(model: any) {

        let url = this.baseUrl
        const handler = this.defaultHandler

        if (model instanceof Activo) {

            url += `/activo/${model.id}`

        } else if (model instanceof Activos) {

            url += `/activo`

        }

        return { url, handler };
    }

    private defaultHandler = (url: string, options: { method: string, body?: string }, callback: (json: any) => void, handleError: (err: any) => void) => {

        fetch(url, options).then((response) => {
            response.json().then((json) => {
                callback(json)
            }).catch((err) => {

                this.handleError(err)
                handleError(err)
            })
        }).catch((err) => {

            this.handleError(err)
            handleError(err)

        })
    }

    private handleError(err: any) {
        console.error(err);
    }
}