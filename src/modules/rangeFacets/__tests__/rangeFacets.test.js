import renderer from 'react-test-renderer';
import { render, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import Products from '../../products/index';
import RangeFacets from '../index';
import UnbxdSearchWrapper from '../../../UnbxdSearchWrapper';
import SearchBox from '../../searchBox';
import { searchResponse } from './mocks/searchMock';
import { facetResponse } from './mocks/searchMock';
import SelectedFacets from '../../selectedFacets/index';
import FacetActions from '../../facetActions/index';

export const FacetItemComponent = ({ itemData, onClick, priceUnit }) => {
    const { from, end, facetName, isSelected = false } = itemData;
    const { name: fromName, count, dataId: fromDataId } = from;
    const { name: ToName, dataId: toDataId } = end;

    const handleClick = () => {
        onClick(itemData);
    };

    return (
        <div
            key={`${facetName}_${fromDataId}-${toDataId}`}
            className={`UNX-facet__item test-class ${
                isSelected ? '-selected' : ''
            }`}
            onClick={handleClick}
        >
            <div className="-checkbox" />
            <div className="-label">
                {priceUnit}
                {fromName} - {priceUnit}
                {ToName}
            </div>
            <div className="-count">({count})</div>
        </div>
    );
};

const FacetItemComponentSelected = ({ itemData, onClick, priceUnit }) => {
    const { name, type, dataId } = itemData;
    const handleClick = () => {
        onClick(itemData);
    };

    let selectedFacetMarkup = null;
    if (type === 'TEXT_FACET') {
        selectedFacetMarkup = <span className="text-selected">{name}</span>;
    }
    if (type === 'RANGE_FACET') {
        const [valMin, valMax] = dataId.split(' TO ');
        selectedFacetMarkup = (
            <span className="range-selected">
                {priceUnit} {valMin} - {priceUnit} {valMax}
            </span>
        );
    }
    if (type === 'MULTILEVEL_FACET') {
        selectedFacetMarkup = <span>{name}</span>;
    }

    return (
        <div className="UNX-selectedFacets__item" onClick={handleClick}>
            {selectedFacetMarkup} <span className="-cross" />
        </div>
    );
};

// establish API mocking before all tests
beforeAll(() => {
    window.fetch = jest.fn((request) => {
        if (request.includes('filter=price:[200 TO 300]')) {
            return Promise.resolve({
                json: () => Promise.resolve(facetResponse)
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

test('Match Snapshot for range facets', async () => {
    const tree = renderer.create(
        <UnbxdSearchWrapper
            siteKey="wildearthclone-neto-com-au808941566310465"
            apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
        >
            <SelectedFacets />
            <RangeFacets />
            <Products attributesMap={attributesMap} />
            <div>
                <SearchBox defaultSearch="shoes" />
            </div>
        </UnbxdSearchWrapper>
    );
    await waitFor(() => tree.toJSON());
    expect(tree.toJSON()).toMatchSnapshot();
});

test('Test range facet click', async () => {
    const { getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <RangeFacets />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(async () => {
        expect(getByText('$ 200 - $ 300 - 60')).toBeInTheDocument();
        fireEvent.click(getByText('$ 200 - $ 300 - 60'));
    });
    await waitFor(() => {
        expect(
            getByText(
                'Salomon OUTblast TS CSWP Mens Hiking Boots - Black/Black/Black'
            )
        ).toBeInTheDocument();
    });
});

test('Test range facet with FacetItemComponent', async () => {
    const { container } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <RangeFacets facetItemComponent={<FacetItemComponent />} />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(container.getElementsByClassName('test-class').length).toBe(9);
    });
});

test('Test range facet click with FacetItemComponent', async () => {
    const { getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <RangeFacets facetItemComponent={<FacetItemComponent />} />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(async () => {
        expect(getByText('$200 - $300')).toBeInTheDocument();
        fireEvent.click(getByText('$200 - $300'));
    });
    await waitFor(() => {
        expect(
            getByText(
                'Salomon OUTblast TS CSWP Mens Hiking Boots - Black/Black/Black'
            )
        ).toBeInTheDocument();
    });
});
test('Test selected facet click on range Facet', async () => {
    const { getByText, container } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <FacetActions showApplyFilter={false} showClearFilter={false} />
                <SelectedFacets />
                <RangeFacets />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(async () => {
        const aRange = getByText('$ 200 - $ 300 - 60');
        expect(aRange).toBeInTheDocument();
        fireEvent.click(aRange);
        
    });
    await waitFor(() => {
        expect(
            container.getElementsByClassName('UNX-facet__item -selected')
                .length
        ).toBe(1);
    });
});

test('Test selected facet click on range Facet with FacetItemComponent', async () => {
    const { getByText, container } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <FacetActions showApplyFilter={false} showClearFilter={false} />
                <SelectedFacets
                    facetItemComponent={<FacetItemComponentSelected />}
                />
                <RangeFacets />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(async () => {
        expect(getByText('$ 200 - $ 300 - 60')).toBeInTheDocument();
        fireEvent.click(getByText('$ 200 - $ 300 - 60'));
    });
    await waitFor(() => {
        expect(container.getElementsByClassName('-selected').length).toBe(
            1
        );
    });
});
