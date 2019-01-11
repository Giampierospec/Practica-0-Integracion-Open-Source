let Ctrl = (()=>{
     let getIndex = (req, res, next) =>{
         res.render('index', {
             title: 'Formulario Generacion Archivo'
         });
     }
    return {
        getIndex
    };
})();

module.exports = {MainController: Ctrl}