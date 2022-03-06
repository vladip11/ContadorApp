const app = Vue.createApp({
    data(){
        return {
            title: "Contador App - Vue",
            count: 0
        };
    },
    methods: {
        counter(instruccion="add", limit=1){
            if(instruccion=="add"){
                this.count += limit;
            }else{
                this.count -= limit;
            }
        }
    }
});