import renderer from 'react-test-renderer';
import { render, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import Products from '../../products/index';
import TextFacets from '../index';
import UnbxdSearchWrapper from '../../../UnbxdSearchWrapper';
import SearchBox from '../../searchBox';
import { searchResponse } from './mocks/searchMock';

const FacetItemComponent = ({ itemData, onClick }) => {
    const { name, count, isSelected } = itemData;
    const handleClick = () => {
        onClick(itemData);
    };

    return (
        <div
            className={`UNX-facet__item ${isSelected ? '-selected' : ''}`}
            onClick={handleClick}
        >
            <div className="-checkbox" />
            <div className="-label">{name}</div>
            <div className="-count">({count})</div>
        </div>
    );
};

// establish API mocking before all tests
beforeAll(() => {
    window.fetch = jest.fn(() => {
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

test('Match Snapshot for text facets', () => {
    const tree = renderer
        .create(
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <TextFacets />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>

        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test('Test text facet click', async () => {
    const { getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >   
                <TextFacets />
                <Products
                    attributesMap={attributesMap}
                />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(async () => {
        expect(getByText('Scarpa - 18')).toBeInTheDocument();
        fireEvent.click(getByText("Scarpa - 18"));
    });
    await waitFor(() => {
        expect(getByText("Scarpa Mont Blanc Pro GTX Goretex Unisex Mountaineering Boots")).toBeInTheDocument();
        fireEvent.click(getByText("Clear"));
    });
});

test('Test text facet click with FacetItemComponent', async () => {
    const { getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >   
                <TextFacets facetItemComponent={<FacetItemComponent />}/>
                <Products
                    attributesMap={attributesMap}
                />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(async () => {
        expect(getByText('Scarpa')).toBeInTheDocument();
        fireEvent.click(getByText("Scarpa"));
    });
    await waitFor(() => {
        expect(getByText("Scarpa Mont Blanc Pro GTX Goretex Unisex Mountaineering Boots")).toBeInTheDocument();
        fireEvent.click(getByText("Clear"));
    });
});



