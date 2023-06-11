export * from './components';
import initIcons from './components/icons';
import type { App } from "vue";
import PortalVue from 'portal-vue'

import './assets/base.css';
import './assets/theme.css';
import './assets/options.css';

function init(app: App){
    initIcons(app);
    app.use(PortalVue);
}

export {init};