import { createLocalVue, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';

import router from '@/router';
import RecipeTile from '@/components/RecipeTile.vue';

const localVue = createLocalVue();

localVue.use(BootstrapVue);

describe('RecipeTile', () => {
  const wrapper = shallowMount(RecipeTile, {
    propsData: { id: 'mango-juice' },
    localVue,
    router,
  });

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('renders the correct props', () => {
    const props = wrapper.props();
    expect(props.id).toBe('mango-juice');
  });

  test('renders the correct title', () => {
    const title = wrapper.find('h5').text();
    expect(title).toMatch(/Mango Juice/);
  });

  test('renders the description cropped to 80 characters', () => {
    const cardText = wrapper.find('b-card-text-stub');
    expect(cardText.text()).toBe(`${wrapper.vm.$data.drink.description.substr(0, 79)}  ...`);
  });

  test('renders full description when less than 80 characters', () => {
    const newDescription = 'A excellent drink!!';
    wrapper.setData({ drink: { description: newDescription } });
    const cardText = wrapper.find('b-card-text-stub');
    expect(cardText.text()).toBe(newDescription);
  });

});
