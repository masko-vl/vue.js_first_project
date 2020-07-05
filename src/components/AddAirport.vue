<template>
    <div>
        <h2>Add new airport to the database</h2>
        <Alert v-if="showAlert==true" :showAlert="show" :message='message'
        />
        <b-form @submit="onSubmit" @reset="onReset" show inline>
            <b-input
                id="name"
                v-model="form.name"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Airport Name"/>
            <b-input 
                id="city" 
                v-model="form.city"
                class="mb-2 mr-sm-2 mb-sm-0" 
                placeholder="City"/>  
            <b-input 
                id="country" 
                v-model="form.country"
                class="mb-2 mr-sm-2 mb-sm-0" 
                placeholder="Country"/>
            <b-input 
                id="iata" 
                v-model="form.iata"
                class="mb-2 mr-sm-2 mb-sm-0" 
                placeholder="Iata"/>
            <b-input  
                id="icao" 
                v-model="form.icao"
                class="mb-2 mr-sm-2 mb-sm-0" 
                placeholder="Icao"/>
            <b-input 
                type="number"   
                id="latitude"
                v-model="form.latitude" 
                class="mb-2 mr-sm-2 mb-sm-0" 
                placeholder="Latitude"/>
            <b-input 
                type="number" 
                id="longitude" 
                v-model="form.longitude"
                class="mb-2 mr-sm-2 mb-sm-0" 
                placeholder="Longitude"/>
            <b-input 
                type="number" 
                id="altitude" 
                v-model="form.altitude"
                class="mb-2 mr-sm-2 mb-sm-0" 
                placeholder="Altitude"/>
            <b-input 
                type="number" 
                id="timezone" 
                v-model="form.timezone"
                class="mb-2 mr-sm-2 mb-sm-0" 
                placeholder="Time zone"/>
            <b-input 
                id="DST"
                v-model="form.dst" 
                class="mb-2 mr-sm-2 mb-sm-0" 
                placeholder="DST"/>
            <b-input 
                id="tz" 
                v-model="form.tz"
                class="mb-2 mr-sm-2 mb-sm-0" 
                placeholder="Tz"/>
            <b-input 
                id="type" 
                v-model="form.type"
                class="mb-2 mr-sm-2 mb-sm-0" 
                placeholder="Type"/>
            <b-input 
                id="source" 
                v-model="form.source"
                class="mb-2 mr-sm-2 mb-sm-0" 
                placeholder="Source"/>
            <b-button type="submit" variant="primary">Add</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
import Alert from '../components/Alert'
const shortid = require('shortid');
export default {
  name: 'add_airport',
  data() {
      return {
        form: {
            name: "",
            city: "",
            country: "",
            iata: "",
            icao: "",
            latitude:" ",
            longitude:"",
            altitude:"",
            timezone:"",
            DST:"",
            tz:"",
            type:"",
            source:"",
            id:""
        },
         show: false,
         showAlert:false,
         message: ""
      }
    },
    components:{
        Alert
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()

        //STILL NEEDED TO ADD FORM CONTROL ALERTS BEFORE SENDING TO DATA

        let newAirport = this.form

        newAirport.id= shortid.generate()

        this.$store.commit('ADD_FORM_DATA', newAirport)

        //success alert
        this.message='Airport added correctly to the database'
        this.showAlert= true
        
        //console.log(this.$store.state.data);

        
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.name = ''
        this.form.city = ''
        this.form.country = ''
        this.form.iata = ''
        this.form.icao = ''
        this.form.latitude = ''
        this.form.altitude = ''
        this.form.timezone = ''
        this.form.dst = ''
        this.form.tz = ''
        this.form.type = ''
        this.form.source = ''

        //hide alert
        this.showAlert= false

        // Trick to reset/clear native browser form validation state
         this.show = false
        this.$nextTick(() => {
          this.show = true
        }) 
      }
    }
}
</script>