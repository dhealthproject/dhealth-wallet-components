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
import ButtonAdd from '@/components/ButtonAdd/ButtonAdd.vue';
 
const localVue = createLocalVue();
const options: ThisTypedShallowMountOptions<Vue> = {
     localVue,
     propsData: {},
 };
 
describe('components/ButtonAdd --->', () => {
 
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(ButtonAdd, options);
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("should use defaults given no properties", () => {
        expect(wrapper.vm.disabled).toEqual(false);
        expect(wrapper.vm.size).toEqual('18');
        expect(wrapper.vm.title).toBeUndefined();
    });

    it("should hide title given no input", async () => {
        expect(wrapper.find('.add-button-title')).toBeDefined();
        expect(wrapper.find('.add-button-title').exists()).toEqual(false);
    });

    it("should show title given input", async () => {
        wrapper.setProps({ title: 'Add something' });
        await Vue.nextTick();

        expect(wrapper.find('.add-button-title')).toBeDefined();
        expect(wrapper.find('.add-button-title').exists()).toEqual(true);
    });
});
