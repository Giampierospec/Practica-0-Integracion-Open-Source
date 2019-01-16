const mongoose = require('mongoose');

let archiveSchema = new mongoose.Schema({
    header:{
        rnc:{type:String,required:true},
        entidad:{type:String, required: true},
        fechaTr:{type:String, required: true},
        fecha:{type:String, required: true},
        cuenta: {type:String, required: true}
            },
            detalle:[{
                cedula:{type:String},
                salario:{type:Number},
                cuentaEmpleado:{type:String}
            }]
});

let Archive = mongoose.model("Archive",archiveSchema);
module.exports = {Archive};