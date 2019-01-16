const {Archive} = require("../models/Archive");

let  DbUtil = (()=>{
    /**
     * 
     * @param {object} body 
     * @param {(err:string)} callback 
     */
    let saveObj = (body,callback)=>{
        let archive = new Archive({
            header: body.header,
            detalle: body.detalle
        });
        archive.save()
        .then(()=>callback(null))
        .catch((e)=> callback("Ocurrio un error al insertar"));
    };
    return {
        saveObj
    };
})();

module.exports = {DbUtil};