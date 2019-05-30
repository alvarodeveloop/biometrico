import React from 'react'
import PropTypes from 'prop-types'
import Instascan from 'instascan'
import axios from 'axios'
import { toast,ToastContainer } from 'react-toastify';
import transformImage from '../utils/transformImage'
import SpinnerAssist from '../components/Basic/SpinnerAssist'


let interval = null,
    scanner = null,
    localStream;

const MODEL_URL = '/models'

class TakeAssist extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      registrados: [],
      count: 3,
      worker : [],
      trabajadores: [],
      loading: true,
      arreglo_id: [],
    }

    this.takeSnapshot = this.takeSnapshot.bind(this)
    this.initScan = this.initScan.bind(this)
    this.initInverval = this.initInverval.bind(this)

  }

  async componentDidMount(){

    await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
    await faceapi.loadFaceLandmarkModel(MODEL_URL)
    await faceapi.loadFaceRecognitionModel(MODEL_URL)
    await faceapi.loadMtcnnModel(MODEL_URL)
    await faceapi.loadFaceRecognitionModel(MODEL_URL)


     let promises = [axios.get('/api/trabajador')]
     let arreglo_fotos = []

     Promise.all(promises).then(async res => {
       this.setState({
         trabajadores : res[0].data
       });
       let labelDestriptors = await Promise.all(
         res[0].data.map(async v => {

           let imgUrl = '../../../images/trabajador/'+v.imagen
           //let img_64 = await transformImage('../../../images/trabajador/'+v.imagen)
           //let img = new Image();
           //img.src = img_64
           let img =  await faceapi.fetchImage(imgUrl)

           let fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()

           if (!fullFaceDescription) {
              arreglo_fotos.push(
                'La foto del trabajador'+v.nombre+' '+v.apellido+' no pudo ser reconocida'
              )
           }else{
             await this.setState({
               arreglo_id: [...this.state.arreglo_id,v.id]
             });
             const faceDescriptors = [fullFaceDescription.descriptor]
             return new faceapi.LabeledFaceDescriptors(v.nombre+' '+v.apellido, faceDescriptors)
           }


         })
       )
       //1558810366.png
       labelDestriptors = labelDestriptors.filter(v => v !== undefined)

       await this.setState({
         worker : labelDestriptors,
         loading: false
       });

       if(arreglo_fotos.length > 0){
         let lista = ''
         arreglo_fotos.forEach((v,i) => {
           lista+= v
           lista+= "\n"
         })
         toast.error(lista, {containerId: 'A'});
       }

        const videoEl = document.getElementById('preview')
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia

        if(navigator.getUserMedia){
          await navigator.getUserMedia(
            { video: true },
            stream => {
              videoEl.srcObject = stream
              localStream = stream
              interval = this.initInverval()
              setTimeout(() => {
                this.initScan()
              },1500)
            },
            err => toast.error('Debe encender su cámara',{containerId: 'A'})
          )
        }else{
          console.log('error menor')
        }
     })
  }

  initInverval(){
      return setInterval(() => {
        this.setState({
          registrados: this.state.registrados.slice(0,-1)
        });
      },300000)
  }

  async initScan(){
    const mtcnnForwardParams = {
      // limiting the search space to larger faces for webcam detection
      minFaceSize: 200
    }
    console.log('aqui')
    const options = new faceapi.MtcnnOptions(mtcnnForwardParams)
    const input = document.getElementById('preview')
    let canvas = document.getElementById('my_canvas')
    faceapi.matchDimensions(canvas, {width: input.width, height: input.height})
    console.log('aqui2')
    let fullFaceDescriptions = await faceapi.detectAllFaces(input, options).withFaceLandmarks().withFaceDescriptors()
    fullFaceDescriptions = faceapi.resizeResults(fullFaceDescriptions,{width: input.width, height: input.height})
    faceapi.draw.drawDetections(canvas, fullFaceDescriptions)
    console.log('aqui3')


    if(fullFaceDescriptions.length > 0){
      const maxDescriptorDistance = 0.6
      const faceMatcher = new faceapi.FaceMatcher(this.state.worker, maxDescriptorDistance)

      const results = fullFaceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor))

      let promise_save = await Promise.all(

        results.map(async (bestMatch, i) => {

          const box = fullFaceDescriptions[i].detection.box
          const text = bestMatch.toString()

          if(text.indexOf('unknown') === -1){

            //let idWorker = text.split('-')[0]
            let registrando = this.state.registrados.filter(v => v == this.state.arreglo_id[i])

            if(registrando.length < 1){

              this.setState({
                registrados : [...this.state.registrados,this.state.arreglo_id[i]]
              });

              const drawBox = new faceapi.draw.DrawBox(box, { label: text })
              drawBox.draw(canvas)

              await this.takeSnapshot(this.state.arreglo_id[i])
            }
          }
          return i
        })
      )

      console.log('finished')
    }

    setTimeout(() => {
      this.initScan()
    },2000)
  }

  takeSnapshot(content){
    return new Promise((resolved,rejected) => {

      var hidden_canvas = document.querySelector('#canvas_modal'),
      video = document.querySelector('#preview'),

      // Get the exact size of the video element.
      width = video.videoWidth,
      height = video.videoHeight,
      context = hidden_canvas.getContext('2d');

      hidden_canvas.width = width;
      hidden_canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
      var imageDataURL = hidden_canvas.toDataURL('image/png');

      let objStore = {
        imagen: imageDataURL,
        id_trabajador: content
      }
      axios.post('/api/asistencia',objStore).then(async res => {
        resolved(true)
        toast.success('Registro Guardado!', {containerId: 'A'});
      }).catch(err => {
        let res = err.response
        if(res.data.error){
          toast.error(res.data.error, {containerId: 'A'});
        }else{
          toast.error('No se guardo el registro, Conctacte con Soporte!', {containerId: 'A'});
        }
        resolved(true)
      })
    })
  }

  componentWillUnmount(){
    let vid = document.getElementById('preview')
    vid.pause();
    vid.src = "";
    localStream.getTracks()[0].stop();
    clearInterval(interval)
  }

  render () {

    const { loading,count } = this.state

    return(
      <div className="">
        {loading ? (
          <div className="container">
            <div className="row justify-content-center align-self-center" style={{ marginTop : '200px'}}>
              <SpinnerAssist loading={loading} />
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <div className="card">
                <div className="card-header" style={{ backgroundColor: 'black', color: 'white'}}>
                  <h3 className="card-title">Registre su entrada y Salida</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 col-sm-12">
                      <div id="video" className="d-flex justify-content-center">
                        <video id="preview" width="900px" height="600px" autoPlay muted></video>
                        <canvas id="my_canvas" style={{ position:'absolute', top: '0px', left: '120px'}} width="900px" height="600px"></canvas>
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
                    <canvas id="canvas_modal"></canvas>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary">Save changes</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_RIGHT} />
          </div>
        )}
      </div>
    )
  }
}


export default TakeAssist;
