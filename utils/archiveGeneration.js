const fs = require('fs');
const {mainDir} = require('../app');
const path = require('path');
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
    console.log(body.split('\n'));
    callback(null,body);
};
return {
    generateArchiveUtil,
    readAndParseFileUtil
}
})();

module.exports = {ArchiveUtil};