const {ArchiveUtil} = require('../utils/archiveGeneration');
let Ctrl = (()=>{
     let getIndex = (req, res, next) =>{
         res.render('index', {
             title: 'Formulario Generacion Archivo'
         });
     }
     let generateArchive = (req, res, next)=>{
        ArchiveUtil.generateArchive(req.body);
        return res.json({status: res.statusCode});
     };
    return {
        getIndex,
        generateArchive
    };
})();

module.exports = {MainController: Ctrl}