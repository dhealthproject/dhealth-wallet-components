/**
 * This file is part of YourDLT Wallet Components shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet Components
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import flushPromises from 'flush-promises';

// internal dependencies
//import { AmountDisplay as AmountDisplayImpl } from '@/components/AmountDisplay/AmountDisplay';

// child components
//@ts-ignore
import AmountDisplay from '@/components/AmountDisplay/AmountDisplay.vue';

const localVue = createLocalVue();
const componentOptions = {
    localVue,
};

describe('components/AmountDisplay --->', () => {
    let amountDisplay: Wrapper<Vue>;

    beforeEach(() => {
        amountDisplay = shallowMount(AmountDisplay, componentOptions);
    });

    [
        { input: 0, integerPart: '0', fractionalPart: '' },
        { input: 1, integerPart: '1', fractionalPart: '' },
        { input: 1.234, integerPart: '1', fractionalPart: '.234' },
        { input: 0.234, integerPart: '0', fractionalPart: '.234' },
        { input: -1, integerPart: '-1', fractionalPart: '' },
        { input: -1.234, integerPart: '-1', fractionalPart: '.234' },
        { input: -0.234, integerPart: '-0', fractionalPart: '.234' },
    ].forEach((testCase) =>
        test(`should display ${testCase.input} correctly`, async () => {
            amountDisplay.setProps({ value: testCase.input });
            await flushPromises();

            expect(amountDisplay.find('.integer-part').text()).toEqual('' + testCase.integerPart);
            expect(amountDisplay.find('.fractional-part').text()).toEqual('' + testCase.fractionalPart);
        }),
    );
});
