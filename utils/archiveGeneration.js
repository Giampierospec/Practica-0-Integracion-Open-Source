const fs = require('fs');
const mainDir = require('../app');
/**
 * convertDate
 * @param {string} str 
 */
let dateConvert = (str)=>{
    let dt = new Date(str);
    return `${dt.getDate()/dt.getMonth()/dt.getFullYear()}`;
};
let ArchiveUtil = (()=>{
/**
 * metodo para generacion del archivo txt
 * @param {Object} body 
 */
let generateArchive = (body)=>{
    console.log(body.header,body.detalle);
    let strm = fs.createWriteStream(`${mainDir.get('mainDir')}/archives/unapec.txt`,{flags:'a'});
    strm.write(`E${body.header.rnc} ${body.header.entidad} ${dateConvert(body.header.fechaTr)} ${dateConvert(body.header.fecha)} ${body.header.cuenta}`);
    body.detalle.forEach(x => {
        strm.write(`D${x.cedula} ${x.salario} ${x.cuentaEmpleado}`);
    });
    strm.end();
    console.log(strm);
};
return {
    generateArchive
}
})();

module.exports = {ArchiveUtil};