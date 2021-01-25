import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import routes from '@/router/routes';
import App from '@/App';
import Home from '@/views/Home';
import Play from '@/views/Play';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('Router functionality', () => {
  const router = new VueRouter({ routes });

  const wrapper = mount(App, {
    stubs: ['router-link'],
    localVue,
    router
  });

  test('Should successfully change routes', () => {
    expect(wrapper.find(Home).exists()).toBe(true);
    expect(wrapper.text()).toContain('The Game of Deciding Who Said What');

    router.push('/play');
    expect(wrapper.find(Play).exists()).toBe(true);
    expect(wrapper.text()).toContain('counter');
  });
});
