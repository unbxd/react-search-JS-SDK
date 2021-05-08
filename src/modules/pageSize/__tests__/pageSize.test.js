import renderer from 'react-test-renderer';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import Products from '../../products';
import UnbxdSearchWrapper from '../../../UnbxdSearchWrapper';
import PageSize from '../index';
import { size5SearchResponse } from './mocks';
import SearchBox from '../../searchBox';
import { searchResponse } from '../../products/__tests__/mocks/searchMock';

// establish API mocking before all tests
beforeAll(() => {
    window.fetch = jest.fn((request) => {
        if (request.includes('rows=5')) {
            return Promise.resolve({
                json: () => Promise.resolve(size5SearchResponse)
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

test('Match Snapshot for page size', async () => {
    const tree = renderer.create(
        <UnbxdSearchWrapper
            siteKey="wildearthclone-neto-com-au808941566310465"
            apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
        >
            <PageSize />
            <SearchBox defaultSearch="shoes" />
            <Products attributesMap={attributesMap} />
        </UnbxdSearchWrapper>
    );
    await waitFor(() => tree.toJSON());
    expect(tree.toJSON()).toMatchSnapshot();
});

test('Page size test', async () => {
    const { getByText, getByTestId, container } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <PageSize />
                <SearchBox defaultSearch="shoes" />
                <Products attributesMap={attributesMap} />
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(getByTestId('UNX-pageSize__dropdown')).toBeInTheDocument();
        expect(getByText('5')).toBeInTheDocument();
        expect(getByText('10')).toBeInTheDocument();
        expect(getByText('15')).toBeInTheDocument();
        expect(
            container.getElementsByClassName('UNX-productCard__container')
        ).toHaveLength(10);
    });
});

test('Page size options test', async () => {
    const sizeOptions = [
        { id: 50, value: '50' },
        { id: 100, value: '100' }
    ];
    const { getByText, getByTestId, container } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <PageSize sizeOptions={sizeOptions} />
                <SearchBox defaultSearch="shoes" />
                <Products attributesMap={attributesMap} />
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(getByTestId('UNX-pageSize__dropdown')).toBeInTheDocument();
        expect(getByText('50')).toBeInTheDocument();
        expect(getByText('100')).toBeInTheDocument();
    });
});

test('Page size component test', async () => {
    const PageSizeItemComponent = ({ itemData, onClick }) => {
        const { value, isSelected } = itemData;
        const handleClick = () => {
            onClick(itemData);
        };
        return (
            <button
                className={`UNX-pageSize__item ${
                    isSelected ? '-selected' : ''
                }`}
                data-testid="custom-page-size-btn"
                onClick={handleClick}
            >
                {value}
            </button>
        );
    };

    const { getAllByTestId } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <PageSize
                    displayType={'LIST'}
                    pageSizeItemComponent={<PageSizeItemComponent />}
                />
                <SearchBox defaultSearch="shoes" />
                <Products attributesMap={attributesMap} />
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(getAllByTestId('custom-page-size-btn'));
    });
});

test('Page size label test', async () => {
    const { getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <PageSize label={'Products per page:'} />
                <SearchBox defaultSearch="shoes" />
                <Products attributesMap={attributesMap} />
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(getByText('Products per page:'));
    });
});

test('Page size size option test', async () => {
    const sizeOptions = [
        { id: 5, value: '5' },
        { id: 10, value: '10' },
        { id: 15, value: '15' }
    ];
    const { getByText, getByTestId, container } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <PageSize sizeOptions={sizeOptions} size={5} />
                <div className="hidden">
                    <SearchBox defaultSearch="shoes" />
                </div>
                <Products attributesMap={attributesMap} />
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(getByTestId('UNX-pageSize__dropdown')).toBeInTheDocument();
        expect(getByText('5')).toBeInTheDocument();
        expect(
            container.getElementsByClassName('UNX-productCard__container')
        ).toHaveLength(10);
    });
});
