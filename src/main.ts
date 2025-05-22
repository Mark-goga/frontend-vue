import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './registerServiceWorker';
import './assets/tailwind.css';
import router from './router';
import { setupRules } from '@/common/utils/define-rules';

const pinia = createPinia();

setupRules();
createApp(App).use(router).use(pinia).mount('#app');
