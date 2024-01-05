<script>
import axios from 'axios';
import HelloWorld from './components/HelloWorld.vue'
import { store } from './store.js'

export default {

  components: {
    HelloWorld,
  },

  data() {
    return {
      store,
    }
  },

  methods: {
    getCoordinate() {
      document.body.classList.add('blurred')
      axios.get('https://nominatim.openstreetmap.org/search?format=json&limit=3&q=' + store.city)
        .then(res => {
          store.coordinate = res.data[0]
          // console.log(store.coordinate)

          axios.get('https://api.open-meteo.com/v1/forecast?&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Europe%2FLondon', {
            params: {
              latitude: store.coordinate.lat,
              longitude: store.coordinate.lon
            }
          }).then(res => {
            console.log(res.data);
            store.todayTemprature = res.data.daily.temperature_2m_max;
            // console.log(store.todayTemprature);
            store.todayTemprature = store.todayTemprature.map(num => Math.round(num))
            store.weatherCode = res.data.daily.weather_code
            store.time = res.data.daily.time

            store.weekWeather = res.data.daily.time.map((time, index) => {
              return {
                timestamp: time,
                iconCode: res.data.daily.weather_code[index],
                maxTemp: Math.round(res.data.daily.temperature_2m_max[index])
              }
            })

            store.weekWeather.shift()
            console.log(store.todayTemprature, store.weatherCode, store.time);
          })
        })
      store.city = ''
      setTimeout(() => {
        document.body.classList.remove('blurred')
      }, 200);
    },
  },

  mounted() {
    this.store.city = 'Lonigo'
    this.getCoordinate()
  },
}

</script>

<template class="blured">
  <header>
    <h1> Search weather of your city </h1>
    <div class="search">
      <input class="searchbar" placeholder="add city" type="text" v-model="store.city" @keydown.enter="getCoordinate()">
    </div>
  </header>
  <HelloWorld />
</template>

<style lang="scss" scoped>
.search {
  padding-bottom: 2rem;

  .searchbar {
    width: 100%;
    padding-left: 0.5rem;
    height: 2rem;
    border-radius: 1rem;
    border: none;
    background-color: rgba($color: #00000000, $alpha: 0.5);
  }
}
</style>
