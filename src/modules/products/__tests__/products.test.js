import renderer from 'react-test-renderer';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Products from '../index';
import UnbxdSearchWrapper from '../../../UnbxdSearchWrapper';
import SearchBox from '../../searchBox';
import { searchResponse, emptySearchResponse } from './mocks/searchMock';

test('Match Snapshot for products', () => {
    window.fetch = jest.fn(() => {
        return Promise.resolve({
            json: () => Promise.resolve(searchResponse),
        });
    });

    const attributesMap = {
        productName: 'title',
        uniqueId: 'uniqueId',
        imageUrl: 'imageUrl',
        price: 'min_cheapest_default_price',
        productUrl: 'productUrl',
    };
    const tree = renderer
        .create(
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>

        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test('Products found test', async () => {
    window.fetch = jest.fn(() => {
        return Promise.resolve({
            json: () => Promise.resolve(searchResponse),
        });
    });
    const attributesMap = {
        productName: 'title',
        uniqueId: 'uniqueId',
        imageUrl: 'imageUrl',
        price: 'min_cheapest_default_price',
        productUrl: 'productUrl',
    };
    const { getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => expect(getByText("Vasque Breeze All-Terrain GTX Womens Hiking Boots - Gargyle")).toBeInTheDocument());
    await waitFor(() => expect(getByText("Scarpa Terra Goretex Unisex Waterproof Hiking Boots - Brown")).toBeInTheDocument());
});

test('No products found test', async () => {
    window.fetch = jest.fn(() => {
        return Promise.resolve({
            json: () => Promise.resolve(emptySearchResponse),
        });
    });
    const attributesMap = {
        productName: 'title',
        uniqueId: 'uniqueId',
        imageUrl: 'imageUrl',
        price: 'min_cheapest_default_price',
        productUrl: 'productUrl',
    };
    const { getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="nonsensical123wait" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => expect(getByText("Sorry! No products found!")).toBeInTheDocument());
});

test('zeroResultsComponent test', async () => {
    window.fetch = jest.fn(() => {
        return Promise.resolve({
            json: () => Promise.resolve(emptySearchResponse),
        });
    });

    const ZeroResultsComponent = () => {
        return <div>No products dude!</div>;
    };

    const { getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <Products
                    attributesMap={attributesMap}
                    zeroResultsComponent={<ZeroResultsComponent />}
                />
                <div>
                    <SearchBox
                        defaultSearch="nonsensical123wait"
                    />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => expect(getByText("No products dude!")).toBeInTheDocument());
});
