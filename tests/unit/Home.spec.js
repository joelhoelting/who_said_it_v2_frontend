import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home';

describe('Home Component', () => {
  const homeWrapper = shallowMount(Home, {
    stubs: ['router-link']
  });

  test('is a Vue instance', () => {
    expect(homeWrapper.isVueInstance()).toBeTruthy();
    const h1 = homeWrapper.find('h1');
    expect(h1.text()).toEqual('The Game of Deciding Who Said What');

    const playBtn = homeWrapper.find('.btn--primary');
    expect(playBtn.text()).toEqual('Play Game');
  });
});
