import * as React from 'react'

import * as moment from 'moment';
import { Table } from 'react-bootstrap';

import { Activos } from 'src/models/activos';




interface Props {
    activos: Activos
}

export class ActivosListComponent extends React.Component<Props, {}>{

    constructor(props: Props, state: {}) {
        super(props)
    }

    public render() {

        const Header = this.Header
        const Body = this.Body

        return (
            <div style={{ padding: '15px'}}>
                <header className="Component-header">
                    <h1 className="Component-title">Lista de activos</h1>
                </header>
                <Table>
                    {Header}
                    <tbody>
                        {Body}
                    </tbody>
                </Table>
            </div>
        )
    }

    private get Header() {
        return (
            <thead>
                <tr>
                    <th>#</th>
                    <th>Identificador</th>
                    <th>Nombre</th>
                    <th>Logitud</th>
                    <th>Diametro</th>
                    <th>Fecha de instalación</th>
                </tr>
            </thead>
        )
    }

    private get Body() {
        const { activos } = this.props

        return activos.array.map((activo, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{activo.id}</td>
                    <td>{activo.nombre}</td>
                    <td>{activo.longitud}</td>
                    <td>{activo.diametro}</td>
                    <td>{moment(activo.fecha).format('DD/MM/YYYY')}</td>
                </tr>
            )
        })
    }

}
