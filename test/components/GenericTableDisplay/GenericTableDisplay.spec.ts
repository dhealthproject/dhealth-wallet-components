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

// custom directive v-infinite-scrool
import infiniteScroll from 'vue-infinite-scroll';
Vue.use(infiniteScroll);

// child components
//@ts-ignore
import GenericTableDisplay from '@/components/GenericTableDisplay/GenericTableDisplay.vue';

const localVue = createLocalVue();
const options: ThisTypedShallowMountOptions<Vue> = {
    localVue,
    propsData: {},
};

const data = [
    { dummy: 'a', dummier: 'a' },
    { dummy: 'b', dummier: 'b' },
    { dummy: 'c', dummier: 'c' },
    { dummy: 'd', dummier: 'd' },
    { dummy: 'e', dummier: 'e' },
    { dummy: 'f', dummier: 'f' },
];

describe('components/GenericTableDisplay --->', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(GenericTableDisplay, options);
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it("should use defaults given no properties", () => {
        expect(wrapper.vm.pageSize).toEqual(20);
        expect(wrapper.vm.sortedBy.fieldName).toEqual('name');
        expect(wrapper.vm.sortedBy.direction).toEqual('asc');
        expect(wrapper.vm.items).toEqual(null);
        expect(wrapper.vm.fields).toBeDefined();
        expect(wrapper.vm.fields.length).toEqual(0);
        expect(wrapper.vm.isLoading).toEqual(false);
        expect(wrapper.vm.disableHeaders).toEqual(false);
        expect(wrapper.vm.disableSinglePageLinks).toEqual(false);
        expect(wrapper.vm.disableRowsGrid).toEqual(false);
        expect(wrapper.vm.disablePlaceholderGrid).toEqual(false);
    });

    it("should enable headers by default", async () => {
        expect(wrapper.find('.table-header-container')).toBeDefined();
    });

    it("should update page size given pageSize property", async () => {
        wrapper.setProps({ pageSize: 10 });
        await Vue.nextTick();

        expect(wrapper.vm.pageSize).toEqual(10);
    });

    it("should disable headers given truthy disableHeaders property", async () => {
        wrapper.setProps({ disableHeaders: true });
        await Vue.nextTick();

        expect(wrapper.find('.table-container').classes()).toContain('without-header');
        expect(wrapper.find('.table-header-container').exists()).toEqual(false);
    });

    it("should feed currentPageRows with items given valid data", async () => {
        const items = data;
        wrapper.setProps({ items });
        await Vue.nextTick();

        expect(wrapper.vm.currentPageRows).toBeDefined();
        expect(wrapper.vm.currentPageRows.length).toEqual(items.length);
    });

    it("should split currentPageRows with items given more than one page", async () => {
        const items = data;
        wrapper.setProps({ items, pageSize: 3 });
        await Vue.nextTick();

        expect(wrapper.vm.currentPageRows).toBeDefined();
        expect(wrapper.vm.currentPageRows.length).toEqual(items.length / 2);
    });

    it("should change page given paginating action", async () => {
        // updates 4th item value
        const items = data.map(
            (v, i) => ({
                ...Object.assign({}, v, {
                    dummy: i === 3 ? 'z' : v.dummy
                })
            })
        );
        wrapper.setProps({ items, pageSize: 3 });
        wrapper.vm.handlePageChange(2);
        await Vue.nextTick();

        expect(wrapper.vm.currentPage).toEqual(2);
        expect(wrapper.vm.currentPageRows).toBeDefined();
        expect(wrapper.vm.currentPageRows.length).toEqual(items.length / 2);
        expect(wrapper.vm.currentPageRows.find(r => r.dummy === 'z')).toBeDefined();
    });

    it("should be pageable given more than one page", async () => {
        const items = data;
        wrapper.setProps({ items, pageSize: 3 });
        await Vue.nextTick();

        expect(wrapper.vm.isPageable).toEqual(true);
    });

    it("should not display footer given disableSinglePageLinks and less than one page", async () => {
        const items = data.slice(0, 3);
        wrapper.setProps({ items, pageSize: 3, disableSinglePageLinks: true });
        await Vue.nextTick();

        expect(wrapper.vm.isPageable).toEqual(false);
        expect(wrapper.find('.table-footer-container').exists()).toEqual(false);
    });
});
