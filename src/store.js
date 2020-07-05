
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
      data: []
    },  
    mutations: {
      FETCH_DATA(state, data) {
          state.data = data
      },
      ADD_FORM_DATA(state, event) {
        //Add the data introduced in the form

        //state.data = [...state.data, event]
        state.data = [...state.data, Object.assign({}, event)]
      },
      DELETE_ELEMENT(state, id){
        const index = state.data.findIndex(airport => airport.id == id)
        state.data.splice(index, 1)

      },
      MODIFICATE(state, selectedAirport, item, newItem){
        //doesn't work, dont recognise item as object or don't recive it
        const index = state.data.findIndex(stateAirport => stateAirport.id == selectedAirport.id)
        
        let atrib=Object.keys(item)
        item[atrib[0]]=newItem
        Object.assign(state.data[index], item) 

      }
    },
    actions: {
      fetchData({ commit }, { self })  {  
          axios({
            method: "GET",
            "url": "https://gist.githubusercontent.com/stepan-passnfly/8997fbf25ae87966e8919dc7803716bc/raw/37c07818c8498ae3d587199961233aada88ed743/airports.json"
        }).then(response => {
            commit("FETCH_DATA", response.data)
            self.showAirports(); 
        }, error => { 
            console.log(error.statusText)
        });      
         
      },
      addFormData({commit}, event) {
        commit('ADD_FORM_DATA', event);

      },
      delateElement({commit}, event){
        commit('DELETE_ELEMENT', event);
      },
      modificateElement({commit}, selectedAirport, item, newItem){
        commit('MODIFICATE', selectedAirport, item, newItem);
      }
    },
    getters:{
        getAirportById: state => id => {
            return state.data.find(event => event.id == id)
          },
        getFiltredByName: state => (text, select)=>{
            return state.data.filter(
                airport =>{ 
                    const keys= Object.keys(airport)
                    //contain text + uppercase=lowercase
                    const regex= new RegExp( text, "gi");
                    
                    for(let i=0; i<= keys.length; i++){
                        if(keys[i]==select){
                            return airport[select].match(regex)
                        }
                    }
                } 
            )
        }
    } 
  })