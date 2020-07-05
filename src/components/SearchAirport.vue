<template>
  <b-container fluid>
    <h3>Search in the database</h3>
    <Alert 
        v-if="showAlert" 
        :showAlert="show" 
        :message='message'/>
  <b-row>
      <b-col sm="1">
      <label for="search">Search the airport:</label>
    </b-col>
    <b-col sm="4">
      <b-form-textarea
        id="search"
        size="sm"
        placeholder="Write your search"
        v-model="writedAirport"
      ></b-form-textarea>
    </b-col>
    </b-row>

    <b-row>
    <b-form-select v-model="selected" :options="options">
      <template v-slot:first>
        <b-form-select-option :value="null" disabled>Please select your filter </b-form-select-option>
      </template>
    </b-form-select>
    <a class="btn btn-primary" v-on:click="search(writedAirport, selected)"><span style="color:white">Search</span></a>
    </b-row>

    <SearchedList v-if="active" :active="active" :filtered="filtered"/>

  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';
import SearchedList from './SearchedList';
import Alert from './Alert';
  export default {
    data() {
      return {
        writedAirport:'',
        selected: null,
        value:'write',
        options: [
          { value: 'name', text: 'By Name' },
          { value: 'iata', text: ' By Iata'} ,
          { value: 'icao', text: 'By Icao' },
        ],
        filtered:[],
        active:false,
        show:false,
        showAlert:false,
        message: ""
      }
    },
    watch: {
      //to show more than once the alerts
        writedAirport: function(){ 
            this.showAlert=false
        },
        selected: function(){
            this.showAlert=false
        }
    },
    components:{
        SearchedList,
        Alert
    },
    computed: {
      //vuex finder
    ...mapGetters(['getFiltredByName'])
    },
    methods:{
        search: function(text, select){
            if(text&&select){
               //console.log(text+'   '+select); 
               this.filtered=this.getFiltredByName(text, select)

               //console.log( this.filtered);
               if( this.filtered.length!==0){
                 //show list component when there are element to show
                   this.active=true
                   
               }else{
                  //alert to complete
                    this.message='There are not results for your search, change your filters'
                    this.showAlert= true
               }
               
            }else{
                 //alert to complete
                    this.message='Please fill both gaps'
                    this.showAlert= true
                
            }
            
        }
    }

  }
</script>