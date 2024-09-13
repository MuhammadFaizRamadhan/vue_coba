import { createApp } from 'vue';
// import Vue from 'vue';
import App from './App.vue';
import { ref } from 'vue';

// dependecies
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import AnimateOnScroll from 'primevue/animateonscroll';

const app = createApp(App);
app.directive('animateonscroll', AnimateOnScroll);

app.use(router);
app.use(ref);

app.mount('#app');
