import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment'
import transformImage from './transformImage'


pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default (data,user) => {

	return new Promise((resolved,rejected) => {

		var header = [
			{text:'Trabajador', style: 'tableHeader', alignment: 'center'},
			{text:'Foto Trabajador', style: 'tableHeader', alignment: 'center'},
			{text:'Foto Asistencia', style: 'tableHeader', alignment: 'center'},
			{text:'Departamento\nTurno', style: 'tableHeader', alignment: 'center'},
			{text:'Tipo Registro', style: 'tableHeader', alignment: 'center'},
			{text:'Tiempo Registro', style: 'tableHeader', alignment: 'center'},
		];

		var bodyTable  = [header]
		let imagen = ""
		let imagen_trabajador = ""
		let stack_trabajador = {text: ""}
		let objectImage = {}

		let promises = []
		data.forEach((e,i) => {

			promises.push(
				e.imagen_trabajador ? transformImage('../../../images/trabajador/'+e.imagen_trabajador) : null
			)

			promises.push(
				transformImage('../../../images/asistencia/'+e.imagen)
			)
		})

		Promise.all(promises).then(val => {

			val.forEach((v,k) => {
				if(val[k * 2]){
					objectImage['imagen_trabajador'+k] = val[k * 2]
				}
				if(val[(k * 2) + 1]){
					objectImage['imagen_asistencia'+k] = val[(k * 2) + 1]
				}
			})


			data.forEach((e,k) => {

				bodyTable.push([
					{text: e.nombre_trabajador, alignment: "center", style: 'paddingCell'},
					{ stack: [ objectImage['imagen_trabajador'+k] ? { image: objectImage['imagen_trabajador'+k], alignment: 'center', width: 40 } : {text : ''} ]  },
					{ stack: [ { image: objectImage['imagen_asistencia'+k], alignment: 'center', width: 40 } ] },
					{text: e.departamento+'\n'+e.turno, alignment: "center", style: 'paddingCell'},
					{text: e.tipo+'\n'+e.llegada, alignment: "center", style: 'paddingCell'},
					{text: e.fecha, alignment: "center", style: 'paddingCell'},
				])

			})

			var docDefinition = {
				content: [
					{
						columns:[
							{text: 'Generado por: '+user.nombre+' '+user.apellido, alignment: 'left',style:'marginContext'},
							{text: 'Fecha: '+moment().format('DD-MM-YYYY'), alignment: 'right',style:'marginContext'},
						]
					},
					{

						style: 'tableExample',
						color: '#444',
						table: {
							widths: ['*','*','*','*', '*','*'],
							headerRows: 1,
							// keepWithHeaderRows: 1,
							body: bodyTable
						},
						layout: {
							hLineWidth: function (i, node) {
								return (i === 0 || i === node.table.body.length) ? 2 : 1;
							},
							vLineWidth: function (i, node) {
								return (i === 0 || i === node.table.widths.length) ? 2 : 1;
							},
							hLineColor: function (i, node) {
								return (i === 0 || i === node.table.body.length) ? '#F1F3F0' : '#F1F3F0';
							},
							vLineColor: function (i, node) {
								return (i === 0 || i === node.table.widths.length) ? '#F1F3F0' : '#F1F3F0';
							},
							// hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
							// vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
							paddingLeft: function(i, node) { return 4; },
							paddingRight: function(i, node) { return 4; },
							paddingTop: function(i, node) { return 10; },
							paddingBottom: function(i, node) { return 8; },
							// fillColor: function (rowIndex, node, columnIndex) { return null; }
						}
					}

				],
				styles: {
					marginContext:{
						margin: [0,0,0,20],
					},
					tableExample: {
						margin: [-10, 0, 0, 0]
					},
					tableHeader: {
						bold: true,
						fontSize: 13,
						color: 'black'
					},
				}
			};
			var pdf = pdfMake.createPdf(docDefinition);
			pdf.download('basics.pdf');

			resolved(true)

		})
	})
}
