import * as React from 'react';
import './App.css';

import { ActivosListComponent } from './compents/ActivosListComponent';
import logo from './logo.svg';
import { Activo } from './models/activo';
import { Activos } from './models/activos';

import { RegistroActivoComponent } from './compents/registro/RegistroActivoComponet';

interface State {
  activos: Activos
}


class App extends React.Component<{}, State> {

  constructor(props: {}, state: State) {
    super(props, state)

    this.state = { activos: new Activos() }

    this.handleSaveActivo.bind(this)

  }

  public componentDidMount() {
    this.loadActivos()
  }


  public render() {

    const { activos } = this.state
    const handleSave = this.handleSaveActivo

    const registroProps = { handleSave }
    const listProps = { activos }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">SPA de la CIC</h1>
        </header>
        <br /><br />
        <p className="App-intro">
          Inventario de activos de <code>Líneas de transporte</code> de hidrocarburos.
        </p>
        <RegistroActivoComponent  {...registroProps} />
        <br /><br /><br /><br />
        <ActivosListComponent {...listProps} />
      </div>
    );
  }

  private loadActivos() {

    const { activos } = this.state

    const handler = (json: []) => {
      // console.log({json});
      this.forceUpdate()
    }

    handler.bind(this)

    activos.load(handler)
  }

  private handleSaveActivo = (activo: Activo) => {

    const { activos } = this.state
    console.log({ activo });

    activos.add(activo.id as number, activo)
    this.forceUpdate()
  }
}

export default App;
