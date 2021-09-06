/**
 * This file is part of YourDLT Wallet Components shared under LGPL-3.0
 * Copyright (C) 2021 Using Blockchain Ltd, Reg No.: 12658136, United Kingdom
 *
 * @package     YourDLT Wallet Components
 * @author      Grégory Saive for Using Blockchain Ltd <greg@ubc.digital>
 * @license     LGPL-3.0
 */
// internal dependencies
import { TableService } from "@/services/TableService";

const items = [
    {name: 'Alice', age: 24},
    {name: 'Bob', age: 33},
];

const fields = [ 
    { name: 'name', label: 'Name' },
    { name: 'age', label: 'Age' },
];

describe('services/TableService --->', () => {

    let service;
    beforeEach(() => {
        service = new TableService(items, fields);
    });

    describe('getTableFields()', () => {
        it("should return correct fields", () => {
            expect(service.getTableFields()).toEqual(fields);
        });

        it("should return empty array given no fields", () => {
            const s2 = new TableService([], undefined);
            expect(s2.getTableFields()).toEqual([]);
        });
    });

    describe('getTableRows()', () => {
        it("should return all rows", () => {
            const rows = service.getTableRows();
            expect(rows).toEqual(items);
            expect(rows.length).toEqual(items.length);
        });

        it("should return empty array given no items", () => {
            const s2 = new TableService(undefined, undefined);
            const rows = s2.getTableRows();
            expect(rows).toEqual([]);
            expect(rows.length).toEqual(0);
        });
    });

    describe('filter()', () => {
        it("should return all rows given show filter", () => {
            const filtered = service.filter(items, {
                fieldName: 'name',
                filteringType: 'show',
            });
            expect(filtered).toEqual(items);
            expect(filtered.length).toEqual(items.length);
        });

        it("should return all rows given no filter", () => {
            const filtered = service.filter(items, undefined);
            expect(filtered).toEqual(items);
            expect(filtered.length).toEqual(items.length);
        });

        it("should return empty array given no rows", () => {
            const s2 = new TableService(undefined, undefined);
            const filtered = s2.filter(undefined, undefined);
            expect(filtered).toEqual([]);
            expect(filtered.length).toEqual(0);
        });

        it("should return non-expired rows only given 'expiration' filter", () => {
            const filtered = service.filter([
                { name: 'Alice', age: 24, expiration: undefined },
                { name: 'Bob', age: 33, expiration: 'expired' },
                { name: 'Carol', age: 35, expiration: undefined },
            ], { fieldName: 'expiration' });
            expect(filtered).toEqual([
                { name: 'Alice', age: 24, expiration: undefined },
                { name: 'Carol', age: 35, expiration: undefined },
            ]);
            expect(filtered.length).toEqual(2);
        });

        it("should return expired rows only given 'expired' filter", () => {
            const filtered = service.filter([
                { name: 'Alice', age: 24, expired: false },
                { name: 'Bob', age: 33, expired: true },
                { name: 'Carol', age: 35, expired: false },
            ], { fieldName: 'expired' });
            expect(filtered).toEqual([
                { name: 'Bob', age: 33, expired: true },
            ]);
            expect(filtered.length).toEqual(1);
        });

        it("should raise an error given unknown filtering field", () => {
            expect(() => {
                service.filter(items, { fieldName: 'unknown' });
            }).toThrow(`TableService: Sorting by 'unknown' field is not yet implemented`);
        });
    });

    describe('sort()', () => {

        let unsortedValues,
            byAlphabet,
            byNumber,
            byBoolean,
            sortingService,
            sortingFields = [ 
                { name: 'name', label: 'Name' },
                { name: 'age', label: 'Age' },
                { name: 'expired', label: 'Expired' },
            ];
        beforeEach(() => {
            unsortedValues = [
                {name: 'Dan', age: 37, expired: true},
                {name: 'Bob', age: 33, expired: true},
                {name: 'Alice', age: 24, expired: false},
                {name: 'Alba', age: 35, expired: true},
                {name: 'Bernard', age: 18, expired: false},
                {name: 'Carol', age: 18, expired: true},
            ];

            byAlphabet = [
                {name: 'Alba', age: 35, expired: true},
                {name: 'Alice', age: 24, expired: false},
                {name: 'Bernard', age: 18, expired: false},
                {name: 'Bob', age: 33, expired: true},
                {name: 'Carol', age: 18, expired: true},
                {name: 'Dan', age: 37, expired: true},
            ];

            byNumber = [
                {name: 'Bernard', age: 18, expired: false},
                {name: 'Carol', age: 18, expired: true},
                {name: 'Alice', age: 24, expired: false},
                {name: 'Bob', age: 33, expired: true},
                {name: 'Alba', age: 35, expired: true},
                {name: 'Dan', age: 37, expired: true},
            ];

            byBoolean = [
                {name: 'Dan', age: 37, expired: true},
                {name: 'Bob', age: 33, expired: true},
                {name: 'Alba', age: 35, expired: true},
                {name: 'Carol', age: 18, expired: true},
                {name: 'Alice', age: 24, expired: false},
                {name: 'Bernard', age: 18, expired: false},
            ];

            sortingService = new TableService(unsortedValues, sortingFields);
        });

        it("should return empty array given no rows", () => {
            const sorted = sortingService.sort(undefined);
            expect(sorted).toEqual([]);
            expect(sorted.length).toEqual(0);
        });

        it("should return untouched items given unknown sorting field", () => {
            const sorted = sortingService.sort(unsortedValues, {
                fieldName: 'unknown',
                direction: 'asc'
            });
            expect(sorted).toEqual(unsortedValues);
            expect(sorted.length).toEqual(unsortedValues.length);
        });

        it("should return items sorted by ascending alphabet given string sample value", () => {
            const sorted = sortingService.sort(unsortedValues, {
                fieldName: 'name',
                direction: 'asc'
            });
            expect(sorted).toEqual(byAlphabet);
            expect(sorted.length).toEqual(byAlphabet.length);
        });

        it("should return items sorted by descending alphabet given string sample value and direction", () => {
            const sorted = sortingService.sort(unsortedValues, {
                fieldName: 'name',
                direction: 'desc'
            });
            expect(sorted).toEqual(byAlphabet.reverse());
            expect(sorted.length).toEqual(byAlphabet.length);
        });

        it("should return items sorted by ascending number given number sample value", () => {
            const sorted = sortingService.sort(unsortedValues, {
                fieldName: 'age',
                direction: 'asc'
            });
            expect(sorted).toEqual(byNumber);
            expect(sorted.length).toEqual(byNumber.length);
        });

        it("should return items sorted by descending number given number sample value and direction", () => {
            const sorted = sortingService.sort(unsortedValues, {
                fieldName: 'age',
                direction: 'desc'
            });
            expect(sorted).toEqual(byNumber.reverse());
            expect(sorted.length).toEqual(byNumber.length);
        });

        it("should return items sorted by ascending boolean given boolean sample value", () => {
            const sorted = sortingService.sort(unsortedValues, {
                fieldName: 'expired',
                direction: 'asc'
            });
            expect(sorted).toEqual(byBoolean);
            expect(sorted.length).toEqual(byBoolean.length);
        });

        it("should return items sorted by descending boolean given boolean sample value and direction", () => {
            const sorted = sortingService.sort(unsortedValues, {
                fieldName: 'expired',
                direction: 'desc'
            });
            expect(sorted).toEqual(byBoolean.reverse());
            expect(sorted.length).toEqual(byBoolean.length);
        });

        it("should raise an error given custom sample value", () => {
            expect(() => {
                unsortedValues[0].name = new RegExp(/.*/);
                const sorted = sortingService.sort(unsortedValues, {
                    fieldName: 'name',
                    direction: 'asc'
                });
            }).toThrow(`TableService: Sorting the data type object is not supported`);
        });
    });

});
