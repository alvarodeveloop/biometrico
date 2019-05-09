import React from 'react'
import PropTypes from 'prop-types'
import Instascan from 'instascan'
import axios from 'axios'
let interval = null,
    scanner = null

class TakeAssist extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      registrados: [],
      count: 3
    }

    this.takeSnapshot = this.takeSnapshot.bind(this)
    this.initScan = this.initScan.bind(this)
    this.initInterval = this.initInterval.bind(this)
  }

  componentDidMount(){

    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

     if (/android/i.test(userAgent)) {
       document.getElementById("video").style.transform="scaleX(-1)";
       document.getElementById("preview").style.border="solid black"
       document.getElementById("preview").style.marginTop="600px"
       document.getElementById("line").style.visibility = "visible";
       document.getElementById("line1").style.visibility = "visible";
     }

     if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
       document.getElementById("video").style.transform="scaleX(-1)";
       document.getElementById("preview").style.border="solid black"
       document.getElementById("preview").style.marginTop="100px"
       document.getElementById("line").style.visibility = "visible";
       document.getElementById("line1").style.visibility = "visible";
     }

     this.initScan()

  }

  initScan(){

    scanner = new Instascan.Scanner({
      video: document.getElementById('preview') ,
    });

    scanner.addListener('scan', async content => {
      /*if(!isNaN(content)){
        this.takeSnapshot(content)
      }else{
        alert('El qr usado no es de asistencia')
      }*/
      if(this.state.registrados.includes(16)){
        alert('Se esta procesando su registro')
      }else{

        await this.setState({
          registrados: [...this.state.registrados,16]
        })

        document.getElementById('aviso').style.display = 'block'

        interval = this.initInterval()
      }

    });

    Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
        scanner.start(cameras[0]);
      } else {
        console.error('No cameras found.');
      }
    }).catch(function (e) {
      console.error(e);
    });

  }

  initInterval(){

    return setInterval( async () => {
      console.log('aquirepiitiend')
      await this.setState({
        count: this.state.count - 1
      })

      if(this.state.count === 0){
        clearInterval(interval)
        this.takeSnapshot(16)
      }

    },1300)

  }

  takeSnapshot(content){

    document.getElementById('aviso').style.display = 'none'
    document.getElementById('aviso1').style.display = 'block'

    var hidden_canvas = document.querySelector('canvas'),
        video = document.querySelector('#preview'),

        // Get the exact size of the video element.
        width = video.videoWidth,
        height = video.videoHeight,
        context = hidden_canvas.getContext('2d');

    hidden_canvas.width = width;
    hidden_canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    var imageDataURL = hidden_canvas.toDataURL('image/png');
    //image.setAttribute('src', imageDataURL);

    let objStore = {
      imagen: imageDataURL,
      id_trabajador: content
    }
    axios.post('/api/asistencia',objStore).then(res => {

      this.setState({
        registrados: [],
        count: 3
      })
      document.getElementById('aviso').style.display = 'none'
      document.getElementById('aviso1').style.display = 'none'
      alert('Registro guardado')
    }).catch(err => {
      console.log(err)
    })

  }

  componentWillUnmount(){
    scanner.stop().then(res =>{
      console.log('scanner stopped')
    })
  }

  render () {

    const { count } = this.state

    return(
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Registre su entrada y Salida</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <div id="video" className="d-flex justify-content-center">
                    <video id="preview" width="500px" height="300px" overflow="hidden"></video>
                    <div className="line" id="line" style={{visibility: 'hidden'}}></div>
                    <div className="line1" id="line1" style={{visibility: 'hidden'}}></div>
                  </div>
                  <br/>
                  <p style={{display: 'none'}} id="aviso" className="alert alert-info text-center">Retire el carnet y una foto de su cara sera tomada en { count }</p>
                  <p style={{display: 'none'}} id="aviso1" className="alert alert-info text-center">Guardando Foto...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <img id="span" />
                <canvas></canvas>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary">Save changes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TakeAssist;
