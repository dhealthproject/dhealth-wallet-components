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

// child components
//@ts-ignore
import NavigationLinks from '@/components/NavigationLinks/NavigationLinks.vue';

const localVue = createLocalVue();
const options: ThisTypedShallowMountOptions<Vue> = {
    localVue,
    propsData: {
        direction: 'horizontal',
    },
};

describe('components/NavigationLinks --->', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(NavigationLinks, options);
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("should render correctly with direction 'horizontal'", () => {
        expect(wrapper.find('.symbol-tab-container').classes()).toEqual(['symbol-tab-container', 'horizontal']);
    });

    it("should render correctly with direction 'vertical'", async () => {
        wrapper.setProps({ direction: 'vertical' });
        await Vue.nextTick();
        expect(wrapper.find('.symbol-tab-container').classes()).toEqual(['symbol-tab-container', 'vertical']);
    });
});
