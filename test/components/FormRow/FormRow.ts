/**
 * This file is part of YourDLT Wallet Components shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet Components
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
import { shallowMount, createLocalVue, ThisTypedShallowMountOptions } from '@vue/test-utils';
import { Vue } from 'vue-property-decorator';

// custom element <Icon> requires view-design
import iView from "view-design";
import locale from "view-design/dist/locale/en-US";
import "view-design/dist/styles/iview.css";
Vue.use(iView, { locale });

// child components
//@ts-ignore
import FormRow from '@/components/FormRow/FormRow.vue';
 
const localVue = createLocalVue();
const options: ThisTypedShallowMountOptions<Vue> = {
     localVue,
     propsData: {},
 };
 
describe('components/FormRow --->', () => {
 
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(FormRow, options);
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("should use defaults given no properties", () => {
        expect(wrapper.vm.className).toEqual('emphasis');
        expect(wrapper.vm.noLabel).toEqual(false);
        expect(wrapper.vm.vertical).toEqual(false);
    });

    it("should update class name given className property", async () => {
        wrapper.setProps({ className: 'test-class' });
        await Vue.nextTick();

        expect(wrapper.vm.className).toEqual('test-class');
    });

    it("should set correct class name given className property", async () => {
        wrapper.setProps({ className: 'test-class' });
        await Vue.nextTick();

        expect(wrapper.find('.form-row').classes()).toContain('test-class');
    });

    it("should display label given falsy noLabel property", async () => {
        wrapper.setProps({ noLabel: false });
        await Vue.nextTick();

        expect(wrapper.find('.label-container')).toBeDefined();
    });

    it("should not display label given truthy noLabel property", async () => {
        wrapper.setProps({ noLabel: true });
        await Vue.nextTick();

        expect(wrapper.find('.label-container')).toBeUndefined();
    });
});
