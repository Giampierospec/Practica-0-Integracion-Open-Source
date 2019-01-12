const {ArchiveUtil} = require('../utils/archiveGeneration');

const path = require('path');
let Ctrl = (()=>{
     let getIndex = (req, res, next) =>{
         res.render('index', {
             title: 'Formulario Generacion Archivo'
         });
     };
     let generateArchive = (req, res, next)=>{
        ArchiveUtil.generateArchiveUtil(req.body,(err,txt)=>{
            console.log(txt);
            if(!err)
                res.status(200).send(txt);
            else
                res.status(400).send(err);
        });
        
     };
     let renderReadFileView = (req,res,next)=>{
        return res.render('read',{
            title:'Lectura Archivo'
        });
     };
     let readFile = (req,res,next)=>{
        
     };
     let downloadArchive = (req,res,next)=>{
       res.sendFile(path.resolve(__basedir, `archives/${req.query.ar}`));
     };
    return {
        getIndex,
        generateArchive,
        downloadArchive,
        readFile,
        renderReadFileView
    };
})();

module.exports = {MainController: Ctrl}