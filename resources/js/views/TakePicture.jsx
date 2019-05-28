import React from 'react'
import PropTypes from 'prop-types'
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios'

class TakePicture extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      id_worker : this.props.match.params.id,
      imagen: ""
    }

    this.takePicture = this.takePicture.bind(this)
    this.deletePicture = this.deletePicture.bind(this)
    this.savePicture = this.savePicture.bind(this)

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

     const videoEl = document.getElementById('preview')
     navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia

     if(navigator.getUserMedia){
       navigator.getUserMedia(
         { video: true },
         stream => videoEl.srcObject = stream,
         err =>{ toast.error('Ha ocurrido un error, contacte con soporte!', {containerId: 'B'}); }
       )
     }else{
       toast.error('Su navegador no soporta camaras web!', {containerId: 'B'});
     }
  }

  takePicture(){

    var hidden_canvas = document.querySelector('canvas'),
        video = document.querySelector('#preview'),
        image_none = document.getElementById('sin_imagen'),
        image_show = document.getElementById('image_show'),

        // Get the exact size of the video element.
        width = video.videoWidth,
        height = video.videoHeight,
        context = hidden_canvas.getContext('2d');

    hidden_canvas.width = width;
    hidden_canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    var imageDataURL = hidden_canvas.toDataURL('image/png');
    image_none.style.display = 'none'
    image_show.setAttribute('src', imageDataURL);
    image_show.style.display = "block"

    this.setState({
      imagen : imageDataURL
    });
  }

  deletePicture(){
    let image_none = document.getElementById('sin_imagen'),
    image_show = document.getElementById('image_show')
    image_show.style.display = 'none'
    image_show.src = ""
    image_none.style.display = "block"
    this.setState({
      imagen: ""
    });
  }

  savePicture(){

    let object = Object.assign({},this.state)
    delete object.id_worker
    axios.put('/api/trabajador/'+this.state.id_worker,object).then(res => {
      toast.success('Imagen Guardada','Éxito', {containerId: 'A'})
      setTimeout(() => {
        this.props.history.push('/trabajador')
      },1000)
    })
  }

  render () {
    return (
      <div className="row">
      <div className="col-md-12 col-sm-12">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Registre su entrada y Salida</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <div id="video">
                  <video id="preview" width="500px" height="300px" autoPlay muted></video>
                  <div className="line" id="line" style={{visibility: 'hidden'}}></div>
                  <div className="line1" id="line1" style={{visibility: 'hidden'}}></div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="d-flex justify-content-center">
                  <img src="/images/sin_imagen.png" id="sin_imagen" width="50%" height="50%" />
                  <img src="" id="image_show" width="70%" height="70%" style={{ display: 'none'}} />
                </div>
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="offset-md-2 offset-sm-2 col-md-3 col-sm-3">
                <button className="btn btn-primary btn-block" onClick={this.deletePicture}>
                  Borrar Foto &nbsp;&nbsp; <i className="fa fa-trash"></i>
                </button>
              </div>
              <div className="col-md-3 col-sm-3">
                <button className="btn btn-block btn-dark" onClick={this.takePicture}>
                  Tomar Foto &nbsp;&nbsp;
                  <i className="fas fa-camera"></i>
                </button>
              </div>
              <div className="col-md-3 col-sm-3">
                <button className="btn btn-block btn-primary" onClick={this.savePicture}>
                  Guardar Foto &nbsp;&nbsp;
                  <i className="fas fa-save"></i>
                </button>
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
      <ToastContainer containerId={'A'} position={toast.POSITION.TOP_RIGHT} />
      <ToastContainer containerId={'B'} position={toast.POSITION.TOP_RIGHT} />
    </div>
    )
  }
}

export default TakePicture;
