<style scoped>
.addmargin {
    margin-top: 10px;
    margin-bottom: 10px;
}
.vue-logo-back {
    background-color: black;
}
</style>


<template>
  <div>
    <h3>SELECTED AIRPORT:</h3>
    <div class="card" v-if="selectedAirport">
        <div class="card-header">
            AIRPORT Details: click  to modificate
        </div>
         <b-row v-if="item">
             <b-col>Modificate:</b-col>
             <b-col >{{ Object.values(item)[0] }}</b-col>
             <b-col>
                 <b-form-textarea
                    id="search"
                    size="sm"
                    v-model="newItem"
                    v-bind:value="item"
                ></b-form-textarea>
             </b-col>
             <b-col>
                 <b-button v-on:click="modificateElement(selectedAirport, item, newItem)">Modificate</b-button>
             </b-col>
         </b-row>
        
        <div v-for="(airportData, atribute) in selectedAirport" :key="airportData.id"  class="card-body">
            <b-button v-on:click="selectProperty(airportData, atribute)">{{ atribute }}: {{ airportData }}</b-button> 
           
        
        </div>
        <a v-on:click="hideDetails()" class="btn btn-primary"><span style="color:white">Hide</span></a>
    </div>
</div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'airportdetails',
    data(){
        return{
           selectedAirport:{},
           item:{},
           newItem:''
        }
    },
    computed:{   
        ...mapGetters(['getAirportById'])
    },
    mounted() {
        //open airport selected
        this.selectedAirport=this.getAirportById(this.$route.params.id)
        
    },
     methods: {
        hideDetails: function() {
            this.$router.push("/all-airports");
        },
        selectProperty: function(airportData, atribute){
            this.item={}
            this.item[atribute]=airportData
            
        },
        modificateElement: function(selectedAirport, item, newItem){
            
             //this.$store.commit('MODIFICATE', selectedAirport, item, newItem)  
             
                const index = this.$store.state.data.findIndex(stateAirport => stateAirport.id == selectedAirport.id)

                let atrib=Object.keys(item)
                item[atrib[0]]=newItem
                //console.log(item);
                
                //assign new value to the airport property selected
                 Object.assign(this.$store.state.data[index], item);
                 //doesn't save in vuex, in store.js isn't work
                
                
        }


    } 
}
</script>