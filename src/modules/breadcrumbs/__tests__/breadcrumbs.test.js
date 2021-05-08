import renderer from 'react-test-renderer';
import {
    render,
    waitFor,
    fireEvent,
    screen,
    getByTestId
} from '@testing-library/react';
import React from 'react';
import Products from '../../products/';
import Breadcrumbs from '../index';
import MultilevelFacets from '../../multilevelFacets';
import UnbxdSearchWrapper from '../../../UnbxdSearchWrapper';
import SearchBox from '../../searchBox';
import { breadcrumbSearchResponse, setsBreadcrumbResponse } from './mocks/';

// establish API mocking before all tests
beforeAll(() => {
    window.fetch = jest.fn((request) => {
        if (request.includes('filter=SUBCATEGORY:"Sets"')) {
            return Promise.resolve({
                json: () => Promise.resolve(setsBreadcrumbResponse)
            });
        }
        return Promise.resolve({
            json: () => Promise.resolve(breadcrumbSearchResponse)
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

const Root = () => <span className="UNX-breadcrumb__root">Home</span>;
const separator = <span className="UNX-breadcrumb__separator">/</span>;

test('Match Snapshot for breadcrumbs', async () => {
    const tree = renderer.create(
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
    const { getByText, getAllByText, container } = render(
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

    await waitFor(() => {
        expect(getByText('SUBCATEGORY')).toBeInTheDocument();
        fireEvent.click(getByText('Sets'));
    });
    await waitFor(() => {
        getAllByText('Home');
        fireEvent.click(getAllByText('Sets')[0]);
    });
});

test('Breadcrumbs Item test', async () => {
    const BreadcrumbItemComponent = ({ itemData, idx, onClick }) => {
        const { value } = itemData;
        const handleClick = () => {
            onClick(itemData);
        };
        return (
            <>
                {idx === 0 && <Root />}
                {separator}
                <div
                    className="UNX-breadcrumbs-list-item"
                    data-testid="UNX-breadcrumbs-list-item-custom"
                    onClick={handleClick}
                >
                    {value}
                </div>
            </>
        );
    };

    const { getByText, getAllByTestId } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <Breadcrumbs
                    breadcrumbItemComponent={<BreadcrumbItemComponent />}
                />
                <MultilevelFacets />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(getByText('Sets')).toBeInTheDocument();
        fireEvent.click(getByText('Sets'));
    });

    await waitFor(() => {
        expect(getAllByTestId('UNX-breadcrumbs-list-item-custom'));
    });
});
