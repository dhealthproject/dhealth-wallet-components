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

// custom element <Icon> & <Tooltip> require view-design
import iView from "view-design";
import locale from "view-design/dist/locale/en-US";
import "view-design/dist/styles/iview.css";
Vue.use(iView, { locale });

// child components
//@ts-ignore
import ButtonRemove from '@/components/ButtonRemove/ButtonRemove.vue';
 
const localVue = createLocalVue();
const options: ThisTypedShallowMountOptions<Vue> = {
     localVue,
     propsData: {},
 };
 
describe('components/ButtonRemove --->', () => {
 
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(ButtonRemove, options);
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("should use defaults given no properties", () => {
        expect(wrapper.vm.disabled).toEqual(false);
    });

    it("should use correct icon", async () => {
        expect(wrapper.find('.remove-icon')).toBeDefined();
        expect(wrapper.find('.remove-icon').attributes()).toBeDefined();
        expect(Object.keys(wrapper.find('.remove-icon').attributes())).toContain('type');
        expect(wrapper.find('.remove-icon').attributes()['type']).toEqual('md-remove-circle');
    });
});
