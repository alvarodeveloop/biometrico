import React, { Component } from 'react';

export default class Footer extends Component {

    render() {
        return (
          <div className="text-center" style={{position: 'fixed',bottom: 0}}>
              <p>Todos los derechos reservados</p>
          </div>
        );
    }
}
