import * as React from 'react'

import * as moment from 'moment';
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import 'react-dates/initialize';
import { isNullOrUndefined } from 'util';

import { Activo } from 'src/models/activo';


interface Props {
    handleSave: (activo: Activo) => void
}

interface State {
    activo: Activo
    focused: boolean
}

export class RegistroActivoComponent extends React.Component<Props, State> {

    constructor(props: Props, state: State) {
        super(props, state)

        this.state = { activo: new Activo(), focused: false }
        this.bind()
    }

    public render() {

        const registro = this.getForm()

        return (
            <div>
                {registro}
            </div>
        )
    }

    private handleChange = (type: string) => (event: any = undefined) => {

        let value = null
        const { activo } = this.state

        if (!isNullOrUndefined(event) && !isNullOrUndefined(event.target)) {

            value = event.target.value
        }

        switch (type) {

            case 'id': {

                activo.id = +value

                this.setState({
                    activo
                }, this.validateId)

                break
            }

            case 'nombre': {

                activo.nombre = value

                this.setState({
                    activo
                })

                break
            }

            case 'longitud': {

                activo.longitud = value

                this.setState({
                    activo
                })

                break
            }

            case 'diametro': {

                activo.diametro = value

                this.setState({
                    activo
                })

                break
            }

            case 'fecha': {

                value = event.toDate()

                activo.fecha = value

                this.setState({
                    activo
                })

                break
            }

            case 'focused': {

                const { focused } = event

                this.setState({
                    focused
                })
                break
            }

        }
    }

    private validateId = () => {

        const { activo } = this.state
        const newActivo = new Activo()

        newActivo.id = activo.id

        const handler = (json: Activo) => {

            activo.exists = json.exists

            this.forceUpdate()

        }

        handler.bind(this)
        newActivo.load(handler)
    }

    private rangeDays(day: any) { return false }

    private getForm = () => {

        const { handleSave, handleChange, rangeDays } = this
        const { activo, focused } = this.state
        const fecha = (isNullOrUndefined(activo.fecha)) ? null : moment(activo.fecha)
        const isValid = activo.isValid()

        // console.log(activo.fecha, {fecha});


        const variant = (isValid) ? 'primary' : 'secondary'
        const saveButtonText = (isValid) ? 'Registrar activo' : 'Por favor finalice el formulario para registrar';


        return (
            <Form validated={isValid} style={{ textAlign: 'left', padding: '15px' }} >

                <header className="Component-header">
                    <h1 className="Component-title">Registre un nuevo activo.</h1>
                </header>

                <FormGroup >
                    <FormLabel>Identificador:</FormLabel>
                    <FormControl onChange={handleChange('id')} type="number" value={'' + activo.id} placeholder="Digite el número de identificador del activo" isInvalid={activo.exists} />
                    <FormControl.Feedback type="invalid">
                        Este codigo de producto ya fue registrado
                    </FormControl.Feedback>
                </FormGroup>

                <FormGroup>
                    <FormLabel>Nombre: </FormLabel>
                    <FormControl onChange={handleChange('nombre')} type="nombre" value={activo.nombre} placeholder="Digite el nombre" />
                    <FormControl.Feedback type="invalid">
                        Por favor digite un nombre valido
                    </FormControl.Feedback>
                </FormGroup>

                <FormGroup>
                    <FormLabel>Longitud: </FormLabel>
                    <FormControl onChange={handleChange('longitud')} type="number" value={'' + activo.longitud} placeholder="Digite la longitud" />
                    <FormControl.Feedback type="invalid">
                        Por favor digite una longitud valida
                    </FormControl.Feedback>
                </FormGroup>

                <FormGroup>
                    <FormLabel>Diametro: </FormLabel>
                    <FormControl onChange={handleChange('diametro')} type="number" value={'' + activo.diametro} placeholder="Digite el díametro" />
                    <FormControl.Feedback type="invalid" >
                        Por favor digite un diametro valido
                    </FormControl.Feedback>
                </FormGroup>


                <FormGroup style={{ textAlign: 'center' }}>
                    <FormLabel>Fecha de instalación: </FormLabel>
                    <Form.Row >
                        <div style={{ flex: 1 }} >
                            <SingleDatePicker
                                date={fecha}
                                placeholder='Fecha'
                                onDateChange={handleChange('fecha')}
                                focused={focused}
                                onFocusChange={handleChange('focused')}
                                isOutsideRange={rangeDays}
                                id="your_unique_id"
                            />
                        </div>

                    </Form.Row>
                </FormGroup>

                <Form.Row style={{ textAlign: 'center' }}>
                    <Button
                        type="button"
                        onClick={handleSave}
                        disabled={!isValid}
                        style={{ flex: 1 }}
                        variant={variant}
                    >
                        {saveButtonText}
                    </Button>
                </Form.Row>

            </Form>
        )
    }

    private handleSave = () => {

        const { activo } = this.state
        const { handleSave } = this.props

        if (!activo.isValid()) {

            this.forceUpdate()
            return
        }

        const handler = (json: any) => {

            const newActivo = new Activo()

            this.setState({
                activo: newActivo
            })

            handleSave(json)
        }
        handler.bind(this)
        activo.save(handler)
    }

    private bind() {
        this.handleSave.bind(this)
    }
}


