import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import './assets/tailwind.css';
import router from './router';
import { setupRules } from '@/common/utils/define-rules';

setupRules();
createApp(App).use(router).mount('#app');
