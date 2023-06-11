import { createApp } from 'vue';
import App from './App.vue';
import {init} from './lib';

const app = createApp(App);
// registerComponents(app);
init(app);
app.mount('body');
