import renderer from 'react-test-renderer';
import { render, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import Products from '../../products/index';
import CombinedFacets from '../index';
import UnbxdSearchWrapper from '../../../UnbxdSearchWrapper';
import SearchBox from '../../searchBox';
import { searchResponse } from './mocks/searchMock';
import { facetResponse } from './mocks/searchMock';
import SelectedFacets from '../../selectedFacets/index';
import FacetActions from '../../facetActions/index';

// establish API mocking before all tests
beforeAll(() => {
    window.fetch = jest.fn((request) => {
        if (request.includes('category-filter=All')) {
            return Promise.resolve({
                json: () => Promise.resolve(facetResponse)
            });
        }
        if (request.includes('filter=brand_uFilter:"Scarpa"')) {
            return Promise.resolve({
                json: () => Promise.resolve(facetResponse)
            });
        }
        if (request.includes('[200%20TO%20300]')) {
            return Promise.resolve({
                json: () => Promise.resolve(facetResponse)
            });
        }
        return Promise.resolve({
            json: () => Promise.resolve(searchResponse)
        });
    });
});

const attributesMap = {
    title: 'title',
    uniqueId: 'uniqueId',
    imageUrl: 'imageUrl',
    price: 'RRP_Price',
    productUrl: 'productUrl'
};

test('Match Snapshot for Combined Facets', async () => {
    const tree = renderer.create(
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
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(async () => {
        expect(getByText('$ 200 - $ 300 - 60')).toBeInTheDocument();
        fireEvent.click(getByText('$ 200 - $ 300 - 60'));
    });
    await waitFor(() => {
        expect(
            getByText(
                'Salomon OUTblast TS CSWP Mens Hiking Boots - Black/Black/Black'
            )
        ).toBeInTheDocument();
    });
});

test('Test Combined Facet text click', async () => {
    const { getByText, getAllByText } = render(
        <>
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
        </>
    );

    await waitFor(async () => {
        expect(getByText('Scarpa - 18')).toBeInTheDocument();
        fireEvent.click(getByText('Scarpa - 18'));
    });
    await waitFor(() => {
        expect(
            getByText(
                'Scarpa Mont Blanc Pro GTX Goretex Unisex Mountaineering Boots'
            )
        ).toBeInTheDocument();
        expect(getByText('Scarpa - 18')).toBeInTheDocument();
        fireEvent.click(getAllByText('Clear')[0]);
    });
});

test('Test Combined Facet category click', async () => {
    const { getByText } = render(
        <>
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
        </>
    );

    await waitFor(async () => {
        expect(getByText('All')).toBeInTheDocument();
        fireEvent.click(getByText('All'));
    });
    await waitFor(() => {
        expect(
            getByText(
                'Vasque Breeze All-Terrain GTX Womens Hiking Boots - Gargyle'
            )
        ).toBeInTheDocument();
    });
});

test('Test selected facet click on range Facet', async () => {
    const { getByText, container } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <FacetActions showApplyFilter={false} showClearFilter={false} />
                <SelectedFacets />
                <CombinedFacets />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(async () => {
        expect(getByText('$ 200 - $ 300 - 60')).toBeInTheDocument();
        fireEvent.click(getByText('$ 200 - $ 300 - 60'));
    });
    await waitFor(() => {
        expect(
            container.getElementsByClassName('UNX-selectedFacets__container')
                .length
        ).toBe(1);
    });
});

test('Test selected facet click on text Facet', async () => {
    const { getByText, container } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <SelectedFacets />
                <CombinedFacets />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(
            container.getElementsByClassName('UNX-selectedFacets__container')
                .length
        ).toBe(1);
        fireEvent.click(getByText('Clear'));
        expect(
            container.getElementsByClassName('UNX-selectedFacets__container')
                .length
        ).toBe(0);
    });
});
