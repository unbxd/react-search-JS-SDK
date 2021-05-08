import renderer from 'react-test-renderer';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import Products from '../../products/';
import SpellCheck from '../index';
import UnbxdSearchWrapper from '../../../UnbxdSearchWrapper';
import SearchBox from '../../searchBox';
import { spellCheckResponse } from './mocks/index';
import { searchResponse } from '../../products/__tests__/mocks/searchMock';

// establish API mocking before all tests
beforeAll(() => {
    window.fetch = jest.fn((query) => {
        if (query.includes('dunlop')) {
            return Promise.resolve({
                json: () => Promise.resolve(searchResponse)
            });
        }
        return Promise.resolve({
            json: () => Promise.resolve(spellCheckResponse)
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
            <SpellCheck />
            <Products attributesMap={attributesMap} />
            <div>
                <SearchBox defaultSearch="shoes" />
            </div>
        </UnbxdSearchWrapper>
    );
    await waitFor(() => tree.toJSON());
    expect(tree.toJSON()).toMatchSnapshot();
});

test('Spell Check test', async () => {
    const { getByTestId, getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <SpellCheck />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="danlop" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(getByTestId('UNX_spellCheck')).toBeInTheDocument();
        expect(getByText('danlop')).toBeInTheDocument();
        expect(getByText('dunlop')).toBeInTheDocument();
        fireEvent.click(getByText('dunlop'));
    });

    await waitFor(() => {
        expect(
            getByText(
                'Vasque Breeze All-Terrain GTX Womens Hiking Boots - Gargyle'
            )
        );
    });
});

test('Spell Check Item component test', async () => {
    const SpellCheckItemComponent = ({ itemData, onClick }) => {
        const { suggestion } = itemData;
        const handleClick = () => {
            onClick(itemData);
        };
        return (
            <div className="UNX-spellCheck__item">
                Did you seriously mean
                <span
                    className="-suggestion"
                    onClick={handleClick}
                    data-testid="UNX_spellCheck_custom"
                >
                    {suggestion}
                </span>
                ?
            </div>
        );
    };
    const { getByTestId } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <SpellCheck
                    spellCheckItemComponent={<SpellCheckItemComponent />}
                />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="danlop" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() =>
        expect(getByTestId('UNX_spellCheck_custom')).toBeInTheDocument()
    );
});
