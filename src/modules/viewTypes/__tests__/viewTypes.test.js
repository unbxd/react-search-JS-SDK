import renderer from 'react-test-renderer';
import {
    render,
    waitFor,
    fireEvent,
    screen,
    getByTestId,
    getByText
} from '@testing-library/react';
import React from 'react';
import Products from '../../products';
import UnbxdSearchWrapper from '../../../UnbxdSearchWrapper';
import ViewTypes from '../index';
import SearchBox from '../../searchBox';
import { searchResponse } from '../../products/__tests__/mocks/searchMock';
import { listViewResponse } from './mocks';

// establish API mocking before all tests
beforeAll(() => {
    window.fetch = jest.fn((request) => {
        if (request.includes('viewType=LIST')) {
            return Promise.resolve({
                json: () => Promise.resolve(listViewResponse)
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

test('Match Snapshot for View types', async () => {
    const tree = renderer.create(
        <UnbxdSearchWrapper
            siteKey="wildearthclone-neto-com-au808941566310465"
            apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
        >
            <ViewTypes />
            <SearchBox defaultSearch="shoes" />
            <Products attributesMap={attributesMap} />
        </UnbxdSearchWrapper>
    );
    await waitFor(() => tree.toJSON());
    expect(tree.toJSON()).toMatchSnapshot();
});

test('View types test', async () => {
    const { container } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <ViewTypes />
                <SearchBox defaultSearch="shoes" />
                <Products attributesMap={attributesMap} />
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(container.getElementsByClassName('UNX-grid-card')).toHaveLength(
            10
        );
    });
});

test('View types grid test', async () => {
    const { container } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <ViewTypes viewTypes={['GRID', 'LIST']} />
                <SearchBox defaultSearch="shoes" />
                <Products attributesMap={attributesMap} />
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(
            container.getElementsByClassName('UNX-viewTypes__dropdown')
        ).toHaveLength(1);
    });
});

test('View types grid test', async () => {
    const ViewItemComponent = ({ itemData, onClick }) => {
        const { viewType, isSelected } = itemData;
        const handleClick = () => {
            onClick(itemData);
        };
        return (
            <div className="UNX-viewType__wrapper">
                <div onClick={handleClick}>{viewType}</div>
            </div>
        );
    };

    const { getByText, container } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <ViewTypes
                    viewTypes={['LIST', 'GRID']}
                    displayType={'LIST'}
                    viewItemComponent={<ViewItemComponent />}
                />
                <SearchBox defaultSearch="shoes" />
                <Products attributesMap={attributesMap} />
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        fireEvent.click(getByText('LIST'));
    });
    await waitFor(() => {
        expect(container.getElementsByClassName('UNX-list-card')).toHaveLength(
            10
        );
    });
});
