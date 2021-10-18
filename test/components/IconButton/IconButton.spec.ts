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

// custom element <Icon> requires view-design
import iView from "view-design";
import locale from "view-design/dist/locale/en-US";
import "view-design/dist/styles/iview.css";
Vue.use(iView, { locale });

// child components
//@ts-ignore
import IconButton from '@/components/IconButton/IconButton.vue';
 
const localVue = createLocalVue();
const options: ThisTypedShallowMountOptions<Vue> = {
     localVue,
     propsData: {},
 };
 
describe('components/IconButton --->', () => {
 
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(IconButton, options);
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("should use defaults given no properties", () => {
        expect(wrapper.vm.disabled).toEqual(false);
        expect(wrapper.vm.title).toBeUndefined();
        expect(wrapper.vm.icon).toEqual('md-add-circle');
    });

    it("should disable given disabled property", async () => {
        wrapper.setProps({ disabled: true });
        await Vue.nextTick();

        expect(wrapper.vm.disabled).toEqual(true);
    });

    it("should add .submit-button given title property", async () => {
        wrapper.setProps({ title: 'Test Title' });
        await Vue.nextTick();

        expect(wrapper.find('.icon-button').classes()).toContain('submit-button');
    });
});
