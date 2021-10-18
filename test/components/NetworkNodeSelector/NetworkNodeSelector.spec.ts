/**
 * This file is part of YourDLT Wallet Components shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet Components
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// NodeService is now a mock constructor
import { shallowMount, createLocalVue, ThisTypedShallowMountOptions } from '@vue/test-utils';
import { Vue } from 'vue-property-decorator';
import flushPromises from 'flush-promises';

// custom element <AutoComplete> requires view-design
import iView from "view-design";
import locale from "view-design/dist/locale/en-US";
import "view-design/dist/styles/iview.css";
Vue.use(iView, { locale });

import { NodeType } from '@/types/NodeType';

// child components
//@ts-ignore
import NetworkNodeSelector from '@/components/NetworkNodeSelector/NetworkNodeSelector.vue';

const localVue = createLocalVue();
const fnMockConnect = jest.fn();
const fnMockNodeInfo = jest.fn();
const fnMockNodePeers = jest.fn();
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

  it("should hide node public key by default", () => {
      expect(wrapper.find('.publickey-input-container')).toBeDefined();
      expect(wrapper.find('.publickey-input-container .input-style').exists()).toEqual(false);
  });

  it ("should display node public key given property", async () => {
    wrapper.setProps({ withPublicKey: true });
    await flushPromises();

    expect(wrapper.find('.publickey-input-container')).toBeDefined();
    expect(wrapper.find('.publickey-input-container .input-style').exists()).toEqual(true);
  });

  it ("should not display peers list by default", async () => {
    expect(wrapper.find('.auto-complete-sub-container').exists()).toEqual(false);
  });

  it ("should display peers list given invalid node", async () => {
    wrapper.vm.onSelect('#invalid');
    await flushPromises();

    expect(wrapper.find('.auto-complete-sub-container')).toBeDefined();
  });
});
