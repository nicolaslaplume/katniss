import './assets/base.css';
import './assets/theme.css';
import './assets/options.css';

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
// registerComponents(app);
app.mount('#app');
