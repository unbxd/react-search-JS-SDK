import renderer from 'react-test-renderer';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import Products from '../../products/';
import Pagination from '../../pagination';
import SearchTitle from '../index';
import UnbxdSearchWrapper from '../../../UnbxdSearchWrapper';
import SearchBox from '../../searchBox';
import { searchResponse } from '../../products/__tests__/mocks/searchMock';
import { page2SearchResponse } from '../../pagination/__tests__/mocks';

// establish API mocking before all tests
beforeAll(() => {
    window.fetch = jest.fn((request) => {
        if (request.includes('start=10')) {
            return Promise.resolve({
                json: () => Promise.resolve(page2SearchResponse)
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

test('Match Snapshot for Search Title', async () => {
    const tree = renderer.create(
        <UnbxdSearchWrapper
            siteKey="wildearthclone-neto-com-au808941566310465"
            apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
        >
            <SearchTitle />
            <Products attributesMap={attributesMap} />
            <div>
                <SearchBox defaultSearch="shoes" />
            </div>
        </UnbxdSearchWrapper>
    );
    await waitFor(() => tree.toJSON());
    expect(tree.toJSON()).toMatchSnapshot();
});

test('Search Title test', async () => {
    const { getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <SearchTitle />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() =>
        expect(getByText('- 1 to 10 of 40 products')).toBeInTheDocument()
    );
});

test('Search Title Pagination test', async () => {
    const { getByText, getByTestId } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <Pagination />
                <SearchTitle />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(getByText('- 1 to 10 of 40 products')).toBeInTheDocument();
        fireEvent.click(getByTestId('UNX_pageNumber2'));
    });

    await waitFor(() => {
        expect(
            screen.getByText('- 11 to 20 of 40 products')
        ).toBeInTheDocument();
    });
});

test('Search Title Item test', async () => {
    const SearchTitleItem = (props) => {
        const { searchQuery, start, productsLn, numberOfProducts } = props;
        return (
            <div>
                Showing results for {searchQuery} - {start + 1} to{' '}
                {start + productsLn} of {numberOfProducts} products
            </div>
        );
    };

    const { getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <SearchTitle searchTitleItem={<SearchTitleItem />} />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() =>
        expect(
            getByText('Showing results for boots - 1 to 10 of 40 products')
        ).toBeInTheDocument()
    );
});
