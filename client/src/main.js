import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'vue3-toastify/dist/index.css';

import Vue3Toastify, { updateGlobalOptions } from 'vue3-toastify';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Vue3Toastify, {
    autoClose: 3000,
 });
updateGlobalOptions({ rtl: false });

app.mount('#app');
