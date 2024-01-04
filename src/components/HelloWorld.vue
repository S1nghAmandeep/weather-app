<script>

import { store } from '../store.js'
import { DateTime } from "luxon"

export default {
  data() {
    return {
      store,
      DateTime,
    }
  },

  methods: {
    getWeatherIcons() {
      const weatherCode = store.weatherCode[0]
      switch (weatherCode) {
        case 0:
          return ['fas', 'sun']
        case 1:
        case 2:
        case 3:
          return ['fas', 'cloud-sun']
        case 45:
        case 48:
          return ['fas', 'smog',]
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
          return ['fas', 'cloud-rain']
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
          return ['fas', 'cloud-showers-heavy']
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
          return ['fas', 'snowflake']
        case 80:
        case 81:
        case 82:
          return ['fas', 'cloud-showers-water']
        case 95:
        case 96:
        case 99:
          return ['fas', 'cloud-bolt']
      }
    },

    getWeekDaysIcons(weatherCode) {

      switch (weatherCode) {
        case 0:
          return ['fas', 'sun']
        case 1:
        case 2:
        case 3:
          return ['fas', 'cloud-sun']
        case 45:
        case 48:
          return ['fas', 'smog',]
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
          return ['fas', 'cloud-rain']
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
          return ['fas', 'cloud-showers-heavy']
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
          return ['fas', 'snowflake']
        case 80:
        case 81:
        case 82:
          return ['fas', 'cloud-showers-water']
        case 95:
        case 96:
        case 99:
          return ['fas', 'cloud-bolt']
      }
    },

    getDate(dateStr) {
      // const date = new Date(dateStr)
      // console.log(date.toUTCString());
      const date = this.DateTime.fromFormat(dateStr, 'yyyy-LL-dd').toFormat('cccc')
      // console.log(date);
      return date
    }
  }


}

</script>
<template>
  <div class="row">
    <div class="card">
      <div class="weather-tem">
        <h1 class="temprature">{{ store.todayTemprature[0] }}&deg;</h1>
        <p class="place">{{ store.coordinate.display_name }}</p>
      </div>
      <div class="icon">
        <font-awesome-icon :icon="getWeatherIcons()" />
        <p class="today">Today</p>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="card-days">
      <div class="days" v-for="(weather, i) in store.weekWeather">
        <div class="sm-icon">
          <font-awesome-icon :icon="getWeekDaysIcons(weather.iconCode)" />
          {{ weather.maxTemp }}&deg;
        </div>
        <p>{{ getDate(weather.timestamp) }}</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.row {
  display: flex;
  flex-wrap: wrap;


  .card {
    border: 2px solid rgb(255, 255, 255);
    width: 100%;
    height: 150px;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    text-align: left;

    .weather-tem {
      align-self: center;
    }

    .temprature {
      font-size: 8rem;
      margin: 0;
    }

    .place {
      font-size: 1rem;
      margin: 0 0 2rem;
    }

    .icon {
      font-size: 8rem;
      align-self: center;
    }

    .today {
      font-size: 1.5rem;
      text-align: center;
    }
  }

  .card-days {
    margin-top: 2rem;
    border: 2px solid rgb(255, 255, 255);
    width: 100%;
    height: 5rem;
    border-radius: 20px;
    display: flex;
    justify-content: space-around;
    // padding: 2rem;
    text-align: center;

    .days {
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-right: 1px solid white;
      padding: 10px;
    }

    .days:last-child {
      border-right: none;
    }

    .sm-icon {
      font-size: 2rem;
    }
  }
}
</style>
