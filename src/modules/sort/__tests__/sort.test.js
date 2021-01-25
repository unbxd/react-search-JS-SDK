import renderer from 'react-test-renderer';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import Products from '../../products/';
import Sort from '../index';
import UnbxdSearchWrapper from '../../../UnbxdSearchWrapper';
import SearchBox from '../../searchBox';
import { searchResponse } from '../../products/__tests__/mocks/searchMock';
import { sortedSearchResponse } from './mocks';

// establish API mocking before all tests
beforeAll(() => {
    window.fetch = jest.fn((request) => {
        if (request.includes('sort=PRODUCT_PRICE%20desc')) {
            return Promise.resolve({
                json: () => Promise.resolve(sortedSearchResponse),
            });
        }
        return Promise.resolve({
            json: () => Promise.resolve(searchResponse),
        });
    });
})

const attributesMap = {
    productName: 'title',
    uniqueId: 'uniqueId',
    imageUrl: 'imageUrl',
    price: 'RRP_Price',
    productUrl: 'productUrl'
};

const sortOptions = [
    {
        label: 'Most Relevant'
    },
    {
        label: 'Lowest Price',
        field: 'PRODUCT_PRICE',
        order: 'asc'
    },
    {
        label: 'Highest Price',
        field: 'PRODUCT_PRICE',
        order: 'desc'
    }
];

test('Match Snapshot for Sort', async () => {
    const tree = renderer
        .create(
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <Sort sortOptions={sortOptions} />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        );
    await waitFor(() => tree.toJSON());
    expect(tree.toJSON()).toMatchSnapshot();
});

test('Sort Item component test', async () => {
    const handleBtnClick = jest.fn();
    const SortItemComponent = ({ itemData, onClick }) => {
        const handleClick = () => {
            onClick(itemData);
            handleBtnClick();
        }
        const { value, isSelected = false } = itemData;
        return (
            <button
                className={`UNX-sortby__item ${isSelected ? '-selected' : ''}`}
                data-testid={value.split('|').join(' ')}
                onClick={handleClick}
            >
                {itemData.label}
            </button>
        );
    };

    const { getByTestId, getByText } = render(
        <UnbxdSearchWrapper
            siteKey="wildearthclone-neto-com-au808941566310465"
            apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
        >
            <Sort sortOptions={sortOptions} displayType={'LIST'} sortItemComponent={<SortItemComponent />} />
            <Products attributesMap={attributesMap} />
            <div>
                <SearchBox defaultSearch="shoes" />
            </div>
        </UnbxdSearchWrapper>
    );
    await waitFor(() => {
        expect(getByTestId("UNX_unbxdSorter")).toBeInTheDocument();
        expect(getByTestId("PRODUCT_PRICE asc")).toBeInTheDocument();
        expect(getByTestId("PRODUCT_PRICE desc")).toBeInTheDocument()
        fireEvent.click(getByText("Highest Price"));
        expect(handleBtnClick).toHaveBeenCalled();
    });
    await waitFor(() => {
        expect(getByText('Babolat RPM Blast 17 Tennis String Reel'));
    });
});

test('Sort label test', async () => {
    const { getByTestId } = render(
        <UnbxdSearchWrapper
            siteKey="wildearthclone-neto-com-au808941566310465"
            apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
        >
            <Sort sortOptions={sortOptions} label={<span data-testid="sortLabel">Sort:</span>} />
            <Products attributesMap={attributesMap} />
            <div>
                <SearchBox defaultSearch="shoes" />
            </div>
        </UnbxdSearchWrapper>
    );
    await waitFor(() => expect(getByTestId("sortLabel")).toBeInTheDocument());
});
