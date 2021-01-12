import renderer from 'react-test-renderer';
import { render, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import Products from '../../products/index';
import RangeFacets from '../index';
import UnbxdSearchWrapper from '../../../UnbxdSearchWrapper';
import SearchBox from '../../searchBox';
import { searchResponse } from './mocks/searchMock';
import { facetResponse } from './mocks/searchMock';

export const FacetItemComponent = ({ itemData, onClick, priceUnit }) => {
    const { from, end, facetName, isSelected = false } = itemData;
    const { name: fromName, count, dataId: fromDataId } = from;
    const { name: ToName, dataId: toDataId } = end;

    const handleClick = () => {
        onClick(itemData);
    };

    return (
        <div
            key={`${facetName}_${fromDataId}-${toDataId}`}
            className={`UNX-facet__item ${isSelected ? '-selected' : ''}`}
            onClick={handleClick}
        >
            <div className="-checkbox" />
            <div className="-label">
                {priceUnit}
                {fromName} - {priceUnit}
                {ToName}
            </div>
            <div className="-count">({count})</div>
        </div>
    );
};

// establish API mocking before all tests
beforeAll(() => {
    window.fetch = jest.fn((request) => {
        if (request.includes('[200%20TO%20300]')) {
            return Promise.resolve({
                json: () => Promise.resolve(facetResponse),
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


test('Match Snapshot for range facets', async () => {
    const tree = renderer
        .create(
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <RangeFacets />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>

        );
        await waitFor(() => tree.toJSON());
        expect(tree.toJSON()).toMatchSnapshot();
});

test('Test range facet click', async () => {
    const { getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >   
                <RangeFacets />
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
        expect(getByText('$ 200 - $ 300 - 60')).toBeInTheDocument();
        fireEvent.click(getByText("$ 200 - $ 300 - 60"));
    });
    await waitFor(() => {
        expect(getByText("Salomon OUTblast TS CSWP Mens Hiking Boots - Black/Black/Black")).toBeInTheDocument();
    });
});

test('Test range facet click with FacetItemComponent', async () => {
    const { getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >   
                <RangeFacets facetItemComponent={<FacetItemComponent />}/>
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
        expect(getByText('$200 - $300')).toBeInTheDocument();
        fireEvent.click(getByText("$200 - $300"));
    });
    await waitFor(() => {
        expect(getByText("Salomon OUTblast TS CSWP Mens Hiking Boots - Black/Black/Black")).toBeInTheDocument();
    });
});



