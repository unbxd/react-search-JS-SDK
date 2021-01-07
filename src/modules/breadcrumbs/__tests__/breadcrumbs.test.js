import renderer from 'react-test-renderer';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import Products from '../../products/';
import Breadcrumbs from '../index';
import MultilevelFacets from '../../multilevelFacets';
import UnbxdSearchWrapper from '../../../UnbxdSearchWrapper';
import SearchBox from '../../searchBox';
import { breadcrumbSearchResponse } from './mocks/';

// establish API mocking before all tests
beforeAll(() => {
    window.fetch = jest.fn(() => {
        return Promise.resolve({
            json: () => Promise.resolve(breadcrumbSearchResponse),
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

const Root = () => <span className="UNX-breadcrumb__root">Home</span>;
const separator = <span className="UNX-breadcrumb__separator">/</span>;

test('Match Snapshot for breadcrumbs', async () => {
    const tree = renderer
        .create(
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <Breadcrumbs root={<Root />} separator={separator} />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        );
    await waitFor(() => tree.toJSON());
    expect(tree.toJSON()).toMatchSnapshot();
});

test('Breadcrumbs test', async () => {
    const { getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <Breadcrumbs root={<Root />} separator={separator} />
                <MultilevelFacets />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => expect(getByText("SUBCATEGORY")).toBeInTheDocument());
    fireEvent.click(getByText("Sets"));
    await waitFor(() => {
        screen.findByText("Home");
    })
});
