import { initializeVueReCaptcha } from '@/helpers/recaptcha';

export default {
  name: 'RecaptchaWrapper',
  props: {
    action: String
  },
  render() {
    return this.$scopedSlots.default({});
  },
  created() {
    if (this.$recaptchaInstance) {
      this.$recaptchaInstance.showBadge();
    } else {
      initializeVueReCaptcha();
    }
  },
  destroyed() {
    this.$recaptchaInstance.hideBadge();
  }
};
