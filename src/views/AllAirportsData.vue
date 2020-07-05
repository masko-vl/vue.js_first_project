<style scoped>
.addmargin {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>

<template>
<b-container fluid>
<div>
  <div>
    <AddAirport/>
    <br><br>
    <AirportSelected v-if="selectedAirport!=''" :selectedAirport="selectedAirport"/>

    
        <Alert v-if="showAlert==true" :showAlert="show" :message='message'/>
        <br><br>
        <SearchAirport/>
        <br><br>
        <h3>This Page Displays All Airports</h3>
        <b-row  cols="6">
          <b-col class="card addmargin" style="width: 18rem;" v-for="airport in data" :key="airport.id">
            <div class="card-body">
                <h5 class="card-title">{{airport.name}}</h5>
                 <a class="btn btn-primary" v-on:click="showSelectedAirport(airport)"><span style="color:white">Modificate detais</span></a>

                 <a class="btn btn-primary" v-on:click="deleteAirport(airport.id)"><span style="color:white">Delete</span></a>
            </div>
          </b-col> 
        </b-row>
    </div>
   </div>
</b-container>
</template>

<script>
import store from "../store.js";
import AddAirport from "../components/AddAirport";
import Alert from "../components/Alert";
import SearchAirport from "../components/SearchAirport"
import { mapState } from 'vuex'

export default {
  name: 'all-airports',
  created() {
    this.$store.dispatch("fetchData", { self: this })       
  },
  components: {
        AddAirport,
        Alert, 
        SearchAirport
    },
    data(){
        return{
          selectedAirport:"",
          show: false,
          showAlert:false,
          message: "" 
        }
    },
  methods:{
    showSelectedAirport: function(airport) {
      const id = airport.id
      //console.log(id);
      
         this.$router.push("/airport-details/"+id);
        //this.selectedAirport = airport;
            
            
        },
    deleteAirport: function(airport) {
      
      this.$store.commit('DELETE_ELEMENT', airport)
      this.message="Airport delated correctly from the database"
      this.showAlert= true
      
    },
    showAirports(){
      //do some
    }
  },
  computed: {
    ...mapState(['data'])
    }
 }
</script>