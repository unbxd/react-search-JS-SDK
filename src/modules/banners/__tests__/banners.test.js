import renderer from 'react-test-renderer';
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import Products from '../../products/';
import Banners from '../index';
import UnbxdSearchWrapper from '../../../UnbxdSearchWrapper';
import SearchBox from '../../searchBox';
import { bannerSearchResponse } from './mocks/';

// establish API mocking before all tests
beforeAll(() => {
    window.fetch = jest.fn(() => {
        return Promise.resolve({
            json: () => Promise.resolve(bannerSearchResponse)
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

test('Match Snapshot for banners', async () => {
    const tree = renderer.create(
        <UnbxdSearchWrapper
            siteKey="wildearthclone-neto-com-au808941566310465"
            apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
        >
            <Banners altText="alt banner text" />
            <Products attributesMap={attributesMap} />
            <div>
                <SearchBox defaultSearch="shoes" />
            </div>
        </UnbxdSearchWrapper>
    );
    await waitFor(() => tree.toJSON());
    expect(tree.toJSON()).toMatchSnapshot();
});

test('Banners alt test', async () => {
    const { getByAltText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <Banners altText="alt banner text" />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() =>
        expect(getByAltText('alt banner text')).toBeInTheDocument()
    );
});

test('Banners Item component test', async () => {
    const BannerItemComponent = ({ itemData }) => {
        const { imageUrl } = itemData;
        return <img src={imageUrl} alt="Banners Item alt text" />;
    };

    const { getByAltText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <Banners bannerItemComponent={<BannerItemComponent />} />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() =>
        expect(getByAltText('Banners Item alt text')).toBeInTheDocument()
    );
});
