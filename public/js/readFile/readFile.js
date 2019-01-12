
(()=>{
    new Vue({
        el:'#app',
        data:{
            msg:null
        },
        methods:{
            sendFile(){
                var file = document.querySelector("#fl").files[0];
                var formData = new FormData();
                formData.append("fltxt",file);
                axios.post('/readArchive',formData,{
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((obj)=>{
                    console.log(obj);
                }).catch((err)=> console.log(err));
            }
        }
    });
})();