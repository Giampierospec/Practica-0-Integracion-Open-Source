const {ArchiveUtil} = require('../utils/archiveGeneration');
const {ValidationUtil} = require('../utils/validationUtil');

const path = require('path');
let Ctrl = (()=>{
     let getIndex = (req, res, next) =>{
         res.render('index', {
             title: 'Formulario Generacion Archivo'
         });
     };
     let generateArchive = (req, res, next)=>{
        ValidationUtil.validate(req.body.detalle,(e)=>{
            if(e)
                return res.status(400).send(e);
            else
                ArchiveUtil.generateArchiveUtil(req.body, (err, txt) => {
                    console.log(txt);
                    if (!err)
                        res.status(200).send(txt);
                    else
                        res.status(400).send("");
                });
        })
        
     };
     let renderReadFileView = (req,res,next)=>{
        return res.render('read',{
            title:'Lectura Archivo'
        });
     };
     let readFile = (req,res,next)=>{
        ArchiveUtil.readAndParseFileUtil(req.file.buffer.toString(),(err,obj)=>{
            if(err)
                res.status(400).send(err);
            else
            res.status(200).send(obj);
        });
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