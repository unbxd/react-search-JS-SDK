import renderer from 'react-test-renderer';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import Products from '../index';
import UnbxdSearchWrapper from '../../../UnbxdSearchWrapper';
import SearchBox from '../../searchBox';
import { searchResponse, emptySearchResponse } from './mocks/searchMock';

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
    price: 'min_cheapest_default_price',
    productUrl: 'productUrl'
};

test('Match Snapshot for products', () => {
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

test('Test CLICK_N_SCROLL', async () => {
    const { getByText, getAllByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <Products
                    attributesMap={attributesMap}
                    paginationType={"CLICK_N_SCROLL"}
                />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(async () => {
        expect(getAllByText("Vasque Breeze All-Terrain GTX Womens Hiking Boots - Gargyle")).toHaveLength(1);
        expect(getByText('Load more')).toBeInTheDocument();
        fireEvent.click(getByText("Load more"));
    });
    await waitFor(() => {
        expect(getAllByText("Vasque Breeze All-Terrain GTX Womens Hiking Boots - Gargyle")).toHaveLength(1);
    });
});

test('loadMoreComponent Test', async () => {
    const LoadMoreComponent = ({ loadMoreProducts }) => {
        return <div onClick={loadMoreProducts}>Load more please</div>;
    };
    const { getByText, getAllByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <Products
                    attributesMap={attributesMap}
                    paginationType={"CLICK_N_SCROLL"}
                    loadMoreComponent={<LoadMoreComponent />}
                />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(async () => {
        expect(getAllByText("Vasque Breeze All-Terrain GTX Womens Hiking Boots - Gargyle")).toHaveLength(1);
        expect(getByText('Load more please')).toBeInTheDocument();
        fireEvent.click(getByText("Load more please"));
    });
    await waitFor(() => {
        expect(getAllByText("Vasque Breeze All-Terrain GTX Womens Hiking Boots - Gargyle")).toHaveLength(1);
    });
});

test('Test onProductClick', async () => {
    const onProductClick = jest.fn();

    const { container } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <Products
                    attributesMap={attributesMap}
                    onProductClick={onProductClick}
                />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        fireEvent.click(container.getElementsByClassName('UNX-product-card')[0]);
        expect(onProductClick).toHaveBeenCalledTimes(1);
    })
});

test('Test loaderComponent', async () => {
    const LoaderComponent = () => {
        return <div>Spinning...</div>;
    };
    const { getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <Products
                    attributesMap={attributesMap}
                    loaderComponent={<LoaderComponent />}
                    showLoader={true}
                />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    expect(getByText('Spinning...')).toBeInTheDocument();
});

test('Test onZeroResults', async () => {
    const onZeroResults = jest.fn();
    window.fetch = jest.fn(() => {
        return Promise.resolve({
            json: () => Promise.resolve(emptySearchResponse),
        });
    });
    render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <Products
                    attributesMap={attributesMap}
                    onZeroResults={onZeroResults}
                />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(onZeroResults).toHaveBeenCalledTimes(1);
    })
});

test('Zero Results test', async () => {
    window.fetch = jest.fn(() => {
        return Promise.resolve({
            json: () => Promise.resolve(emptySearchResponse),
        });
    });

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
