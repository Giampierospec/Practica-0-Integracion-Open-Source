const fs = require('fs');
const {DbUtil} = require('../utils/archiveUtil');
const path = require('path');
let archiveModel = {
    header: {
        rnc: 0,
        entidad: "",
        fechaTr: "",
        fecha: "",
        cuenta: 0
    },
    detalle: [],
    sumario: {
        cantidadRegistros:0
    }
};
/**
 * convertDate
 * @param {string} str 
 */
let dateConvert = (str)=>{
    let dt = new Date(str);
    return `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;
};
let ArchiveUtil = (()=>{
/**
 * metodo para generacion del archivo txt
 * @param {Object} body 
 * @param {(err:string,txt:string)} callback
 */
let generateArchiveUtil = (body,callback)=>{
    //  let strm = fs.createWriteStream(,{flags:'a'});
    let flStr = "";
    flStr += `E${body.header.rnc} ${body.header.entidad} ${dateConvert(body.header.fechaTr)} ${dateConvert(body.header.fecha)} ${body.header.cuenta}\n`;
    body.detalle.forEach(x => {
        flStr += `D${x.cedula} ${x.salario} ${x.cuentaEmpleado}\n`;
    });
    flStr += `S${body.detalle.length}`;
    let fileName =  `unapec-${new Date().getTime()}.txt`
    let pth = path.resolve(__basedir, `archives/${fileName}`);
    console.log(pth);
            fs.writeFile(pth, flStr, (err) => {
                if (err) 
                    return callback(err);
                else
                    return callback(null,fileName);
            });
    // strm.end();
};
/**
 * metodo para parsear el archivo y leerlo
 * @param {Object} body 
 * @param {(err:string,obj:Object)} callback 
 */
let readAndParseFileUtil = (body,callback)=>{
    let archiveLines = body.split('\n');
    let header = archiveLines[0].split(' ');
    let footer = archiveLines[archiveLines.length -1];
    archiveModel.header = {
        rnc: header[0].replace('E',""),
        entidad: header[1],
        fechaTr: header[2],
        fecha: header[3],
        cuenta: header[4]
    };
    archiveLines.forEach((x,index)=>{
        if (index !== 0 && index !== archiveLines.length - 1){
        let detail = x.split(' ');
        archiveModel.detalle.push({
            cedula: detail[0].replace("D",""),
            salario: detail[1],
            cuentaEmpleado: detail[2]
        });
    }
    });
    archiveModel.sumario = {
        cantidadRegistros: footer.replace('S','')
    };
    DbUtil.saveObj(archiveModel,(err)=>{
        if(err)
            callback(err);
        else
        callback(null, archiveModel);
    });


    
};
return {
    generateArchiveUtil,
    readAndParseFileUtil
}
})();

module.exports = {ArchiveUtil};