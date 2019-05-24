import React from 'react'
import PropTypes from 'prop-types'
import Instascan from 'instascan'
import axios from 'axios'
import { toast,ToastContainer } from 'react-toastify';
import transformImage from '../utils/transformImage'

let interval = null,
    scanner = null
const MODEL_URL = '/models'

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

  async componentDidMount(){

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

     await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
     await faceapi.loadFaceLandmarkModel(MODEL_URL)
     await faceapi.loadFaceRecognitionModel(MODEL_URL)
     this.initScan()

  }

  async initScan(){

    /*scanner = new Instascan.Scanner({
      video: document.getElementById('preview') ,
    });

    scanner.addListener('scan', async content => {

      if(this.state.registrados.includes(content)){
        toast.warning('Ya se esta procesando su registro!', {containerId: 'A'});
      }else{

        await this.setState({
          registrados: [...this.state.registrados,content]
        })

        document.getElementById('aviso').style.display = 'block'

        interval = this.initInterval(content)
      }

    });

    Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
        scanner.start(cameras[0]);
      } else {
        toast.error('No se detectaron camaras en el equipo!', {containerId: 'A'});
      }
    }).catch(function (e) {
      toast.error('Ha ocurrido un error, contacte con soporte!', {containerId: 'A'});
    });*/

    console.log('aqui')

    const input = document.getElementById('my_image')
    let fullFaceDescriptions = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors()
    console.log('aqui1')
    fullFaceDescriptions = faceapi.resizeResults(fullFaceDescriptions,{width: input.width, height: input.height})
    console.log('aqui2')
    let canvas = document.getElementById('my_canvas')
    faceapi.draw.drawDetections(canvas, fullFaceDescriptions)

    console.log('aqui3')
    console.log('aqui empieza la detedciipin')

    const labels = ['howard']

    let promise = await Promise.all(
      labels.map(async label => {
        let imgUrl = '../../../images/'+label+'.png'
        let img =  await faceapi.fetchImage(imgUrl)
        return img
      })
    )

    console.log(promise,'aqui la promesa 1')
    let promises2 = await Promise.all(
          promise.map(async (v,i) =>{
            return await faceapi.detectSingleFace(v).withFaceLandmarks().withFaceDescriptor()
          })
        )

    let promise3 = await Promise.all(
      promises2.map((v,i) => {

        let fullFaceDescription = v
        if (!fullFaceDescription) {
          throw new Error(`no faces detected for ${labels[i]}`)
        }

        let faceDescriptors = [fullFaceDescription.descriptor]

        return new faceapi.LabeledFaceDescriptors(labels[i], faceDescriptors)

      })
    )
    console.log('aqui empieza el dibujado')
    const maxDescriptorDistance = 0.6
    const faceMatcher = new faceapi.FaceMatcher(promise3, maxDescriptorDistance)

    const results = fullFaceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor))

    results.forEach((bestMatch, i) => {
      const box = fullFaceDescriptions[i].detection.box
      const text = bestMatch.toString()
      const drawBox = new faceapi.draw.DrawBox(box, { label: text })
      drawBox.draw(canvas)
    })

    console.log('finished')
  }

  initInterval(){

    return setInterval( async () => {

      await this.setState({
        count: this.state.count - 1
      })

      if(this.state.count === 0){
        clearInterval(interval)
        this.takeSnapshot(content)
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
      toast.success('Registro Guardado!', {containerId: 'A'});
    }).catch(err => {

      document.getElementById('aviso').style.display = 'none'
      document.getElementById('aviso1').style.display = 'none'

      this.setState({
        registrados: [],
        count: 3
      })

      let res = err.response
      if(res.data.error){
        toast.error(res.data.error, {containerId: 'A'});
      }else{
        toast.error('No se guardo el registro, Conctacte con Soporte!', {containerId: 'A'});

      }
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
        <div className="col-md-12 co-sm-12">
          <img src="/images/faces.jpg" id="my_image" width="100%" />
          <canvas id="my_canvas" style={{ position:'absolute', top: '0px', left: '15px'}} width="1110px" height="624px"></canvas>
        </div>
      </div>
      /*<div className="row">
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
        <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_RIGHT} />
      </div>*/
    )
  }
}

export default TakeAssist;
