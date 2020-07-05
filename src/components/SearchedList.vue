<template>
    <b-container fluid v-if="active">
        <b-list-group v-for="airport in this.filtered" :key="airport.id">
            <b-list-group-item variant="info">{{airport.name}}</b-list-group-item>
        </b-list-group>
    </b-container>
</template>

<script>
export default {
  name: 'searched_list',
  data(){
      return{
           
      }
  },
  props:{
      active:false,
      filtered:{
          type: Array,
          default:[]
      }
  }
  
}
</script>