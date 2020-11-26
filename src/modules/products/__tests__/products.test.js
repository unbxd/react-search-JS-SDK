import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react'

import React from 'react'
import Products from '../index';
import UnbxdSearchWrapper from '../../../UnbxdSearchWrapper';
import SearchBox from '../../searchBox';

test('Match Snapshot for products', () => {
    window.fetch = jest.fn(() => Promise.resolve());
    const attributesMap = {
        productName: 'title',
        uniqueId: 'uniqueId',
        imageUrl: 'imageUrl',
        price: 'min_cheapest_default_price',
        productUrl: 'productUrl',
    };
    const tree = renderer.create((
        <UnbxdSearchWrapper
            siteKey="wildearthclone-neto-com-au808941566310465"
            apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
        >
            <Products attributesMap={attributesMap} />
            <div>
                <SearchBox defaultSearch='shoes' />
            </div>
        </UnbxdSearchWrapper>
    )).toJSON();
    expect(tree).toMatchSnapshot();
});

test('No products found test', () => {
    window.fetch = jest.fn(() => Promise.resolve());
    const attributesMap = {
        productName: 'title',
        uniqueId: 'uniqueId',
        imageUrl: 'imageUrl',
        price: 'min_cheapest_default_price',
        productUrl: 'productUrl',
    };
    render(
        <UnbxdSearchWrapper
            siteKey="wildearthclone-neto-com-au808941566310465"
            apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
        >
            <Products attributesMap={attributesMap} />
            <div>
                <SearchBox defaultSearch='shoes' />
            </div>
        </UnbxdSearchWrapper>
    );
    expect(screen.getByText('Sorry! No products found!')).toBeInTheDocument();
});
