import renderer from 'react-test-renderer';
import { render, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import Products from '../../products/index';
import CombinedFacets from '../index';
import UnbxdSearchWrapper from '../../../UnbxdSearchWrapper';
import SearchBox from '../../searchBox';
import { searchResponse } from './mocks/searchMock';



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


test('Match Snapshot for Combined Facets', async () => {
    const tree = renderer
        .create(
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <CombinedFacets />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>

        );
        await waitFor(() => tree.toJSON());
        expect(tree.toJSON()).toMatchSnapshot();
});

test('Test Combined Facet range click', async () => {
    const { getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >   
                <CombinedFacets />
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


test('Test Combined Facet text click', async () => {
    const { getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >   
                <CombinedFacets />
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
