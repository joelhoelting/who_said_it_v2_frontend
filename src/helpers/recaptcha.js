import Vue from 'vue';
import { VueReCaptcha } from 'vue-recaptcha-v3';

export const initializeVueReCaptcha = () => {
  Vue.use(VueReCaptcha, {
    siteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
    loaderOptions: {
      autoHideBadge: false
    }
  });
};
