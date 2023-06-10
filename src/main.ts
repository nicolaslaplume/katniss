import './assets/base.css';
import './assets/theme.css';
import './assets/options.css';
import PortalVue from 'portal-vue'
import { createApp } from 'vue';
import App from './App.vue';
import initIcons from './components/icons';

const app = createApp(App);
// registerComponents(app);
initIcons(app);
app.use(PortalVue);
app.mount('body');
