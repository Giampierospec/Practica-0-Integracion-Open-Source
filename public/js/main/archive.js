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
            }
        }
    });
})();