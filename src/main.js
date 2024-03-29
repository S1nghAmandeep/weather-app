import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faSun, faCloudSunRain, faCloud, faCloudRain, faSnowflake, faSmog, faCloudSun, faCloudShowersHeavy, faCloudShowersWater, faCloudBolt } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faSun, faCloudSunRain, faCloud, faCloudRain, faSnowflake, faSmog, faCloudSun, faCloudShowersHeavy, faCloudShowersWater, faCloudBolt)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
