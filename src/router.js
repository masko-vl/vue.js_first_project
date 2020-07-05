
import Vue from 'vue'
import Router from 'vue-router'
import AllAirportsData from './views/AllAirportsData.vue'
import AirportSelected from './views/AirportSelected.vue'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/all-airports'
    },
    {
        path: '/all-airports',
        name: 'all-airports',
        component: AllAirportsData
      },
      {
        path: '/airport-details/:id',
        name: 'airportdetails',
        component: AirportSelected
      }
  ]
})
export default router