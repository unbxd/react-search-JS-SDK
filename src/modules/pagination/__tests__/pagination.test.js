import renderer from 'react-test-renderer';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import Products from '../../products/';
import Pagination from '../../pagination';
import UnbxdSearchWrapper from '../../../UnbxdSearchWrapper';
import SearchBox from '../../searchBox';
import { searchResponse } from '../../products/__tests__/mocks/searchMock';
import { page2SearchResponse } from './mocks';

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

test('Match Snapshot for Pagination', async () => {
    const tree = renderer.create(
        <UnbxdSearchWrapper
            siteKey="wildearthclone-neto-com-au808941566310465"
            apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
        >
            <Pagination />
            <Products attributesMap={attributesMap} />
            <div>
                <SearchBox defaultSearch="shoes" />
            </div>
        </UnbxdSearchWrapper>
    );
    await waitFor(() => tree.toJSON());
    expect(tree.toJSON()).toMatchSnapshot();
});

test('Pagination buttons test', async () => {
    const { getByTestId, container } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <Pagination />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(getByTestId('UNX_pagination-next')).toBeInTheDocument();
        expect(getByTestId('UNX_pageNumber1')).toBeInTheDocument();
        expect(getByTestId('UNX_pageNumber2')).toBeInTheDocument();
        fireEvent.click(getByTestId('UNX_pageNumber2'));
    });

    await waitFor(() => {
        expect(getByTestId('UNX_pagination-prev')).toBeInTheDocument();
    });
});

test('Pagination padding test', async () => {
    const { getByTestId } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <Pagination padding={3} />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(getByTestId('UNX_pageNumber1')).toBeInTheDocument();
        expect(getByTestId('UNX_pageNumber2')).toBeInTheDocument();
        expect(getByTestId('UNX_pageNumber3')).toBeInTheDocument();
        expect(getByTestId('UNX_pageNumber4')).toBeInTheDocument();
    });
});

test('Pagination prev and next click test', async () => {
    const { getByTestId } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <Pagination padding={1} />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(getByTestId('UNX_pagination-next')).toBeInTheDocument();
        fireEvent.click(getByTestId('UNX_pagination-next'));
    });

    await waitFor(() => {
        expect(getByTestId('UNX_pageNumber3')).toBeInTheDocument();
        expect(getByTestId('UNX_pagination-prev')).toBeInTheDocument();
        fireEvent.click(getByTestId('UNX_pagination-prev'));
        expect(getByTestId('UNX_pageNumber1')).toBeInTheDocument();
    });
});

test('Pagination Item component test', async () => {
    const PaginationItemComponent = ({ itemData, onClick }) => {
        const { pageNumber, type, isSelected = false } = itemData;
        return (
            <div
                data-pagenumber={pageNumber}
                onClick={onClick ? onClick : null}
            >
                {type === 'NUMBER' && (
                    <button
                        data-testid={`page-${pageNumber}-do`}
                        className={`UNX-pageNavigation__button ${
                            isSelected ? '-isSelected' : ''
                        }`}
                    >
                        {pageNumber}
                    </button>
                )}
                {type === 'PREVIOUS' && (
                    <button className="UNX-pageNavigation__button -action">
                        &lt;
                    </button>
                )}
                {type === 'NEXT' && (
                    <button className="UNX-pageNavigation__button -action">
                        &gt;
                    </button>
                )}
            </div>
        );
    };

    const { getByTestId } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <Pagination
                    paginationItemComponent={<PaginationItemComponent />}
                />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(getByTestId('page-1-do')).toBeInTheDocument();
        expect(getByTestId('page-2-do')).toBeInTheDocument();
    });
});
