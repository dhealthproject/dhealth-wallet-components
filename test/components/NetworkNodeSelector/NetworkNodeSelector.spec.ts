/**
 * This file is part of dHealth Wallet Components shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     dHealth Wallet Components
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
import { shallowMount, createLocalVue, ThisTypedShallowMountOptions } from '@vue/test-utils';
import { Vue } from 'vue-property-decorator';
import { NodeType } from '@dhealth/wallet-api-bridge';
import flushPromises from 'flush-promises';

// custom element <AutoComplete> requires view-design
import iView from "view-design";
import locale from "view-design/dist/locale/en-US";
import "view-design/dist/styles/iview.css";
Vue.use(iView, { locale });

// child components
//@ts-ignore
import NetworkNodeSelector from '@/components/NetworkNodeSelector/NetworkNodeSelector.vue';

const localVue = createLocalVue();
const options: ThisTypedShallowMountOptions<Vue> = {
  localVue,
  propsData: {},
};

describe('components/NetworkNodeSelector --->', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(NetworkNodeSelector, options);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("should use defaults given no properties", () => {
      expect(wrapper.vm.includeRoles).toEqual([NodeType.ApiNode]);
      expect(wrapper.vm.value).toBeUndefined();
      expect(wrapper.vm.disabled).toEqual(false);
      expect(wrapper.vm.withPublicKey).toEqual(false);
  });

  it ("should not display peers list by default", async () => {
    expect(wrapper.find('.auto-complete-sub-container').exists()).toEqual(false);
  });

  it ("should display peers list given invalid node", async () => {
    wrapper.vm.onChange('#invalid');
    await flushPromises();

    expect(wrapper.find('.auto-complete-sub-container')).toBeDefined();
  });
});
