

(()=>{
    new Vue({
        el:'#app',
        data:{
            archiveModel:{
                header:{
                    rnc:0,
                    entidad:"",
                    fechaTr:"",
                    fecha:"",
                    cuenta:0
                },
                detalle:[{
                    cedula:0,
                    salario:0,
                    cuentaEmpleado:0
                }]
            },
             errors: []
        },
        computed:{
            vd(){
                return {
                    cedula: 11,
                    rnc: 9,
                    cuenta: 10,
                    cuentaEmpleado: 10
                };
            }
        },
        methods:{
            pushDetalle(){
                document.getElementById("elDt").setAttribute("class", "btn btn-danger");
                this.archiveModel.detalle.push({
                        cedula: 0,
                        salario:0,
                        cuentaEmpleado:0
                });
            },
            popDetalle(ev){
                if(this.archiveModel.detalle.length > 1)
                    this.archiveModel.detalle.pop();
                else
                    ev.target.setAttribute("class","btn disabled");
            },
            generateArchive(){
                this.errors = [];
                this.checkObj(this.archiveModel);
                if(!this.errors.length)
                {
                    axios.post('/archive', this.archiveModel)
                        .then((d) => {
                            swal({
                                title:'Procesado correctamente',
                                text:"El archivo fue generado exitosamente",
                                icon:"success"
                            }).then(()=>{
                                window.open(`/downloadArchive?ar=${d.data}`, "_blank");
                            });
                        })
                        .catch((e) => {
                            if(e.response.data)
                               {
                                    swal({
                                        title: "Ocurrió un Error",
                                        text: e.response.data,
                                        icon: "error"
                                    });
                                    
                               }
                        });
                }
                else
                    swal({
                        title: "Los siguientes campos tienen los siguientes errores",
                        text: this.errors.join('\n'),
                        icon:"error"
                    });
            },
            checkLength(ev,length = 11){
                if(ev.target.value.length === length)
                    ev.preventDefault();
            },
            checkObj(obj){
                Object.keys(obj).forEach((k)=>{
                    if (typeof obj[k] === 'object')
                        this.checkObj(obj[k]);
                    else if(!obj[k])
                        this.errors.push(`El campo ${k} está vacío`);
                     else if (this.vd[k] && obj[k].length !== this.vd[k])
                         this.errors.push(`El campo ${k} no tiene la longitud esperada de ${this.vd[k]}`)
                });
            }
        }
    });
})();