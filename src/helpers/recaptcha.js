import Vue from 'vue';
import { VueReCaptcha } from 'vue-recaptcha-v3';

export const initializeVueReCaptcha = () => {
  Vue.use(VueReCaptcha, {
    siteKey: '6LfXd94UAAAAAAEp6hpVvJLYXnPPxHOwBSBCniPS',
    loaderOptions: {
      autoHideBadge: false
    }
  });
};
