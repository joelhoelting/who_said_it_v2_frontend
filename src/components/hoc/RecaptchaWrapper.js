import { initializeVueReCaptcha } from '@/helpers/recaptcha';

export default {
  name: 'RecaptchaWrapper',
  props: {
    action: String
  },
  render() {
    return this.$scopedSlots.default({
      data: 'something',
      status: {
        error: 'error',
        pending: 'sad',
        resolved: 'funny'
      }
    });
  },
  created() {
    console.log(this.action);
    if (this.$recaptchaInstance) {
      this.$recaptchaInstance.showBadge();
    } else {
      initializeVueReCaptcha();
    }
  },
  destroyed() {
    this.$recaptchaInstance.hideBadge();
  },
  methods: {
    async getRecaptchaToken() {
      console.log('test');
      // await this.$recaptchaLoaded();
      // // Execute reCAPTCHA with action "sign_in".
      // const token = await this.$recaptcha(this.action);
      // return token;
    }
  }
};
