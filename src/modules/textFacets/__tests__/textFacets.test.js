import renderer from 'react-test-renderer';
import { render, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import Products from '../../products/index';
import TextFacets from '../index';
import UnbxdSearchWrapper from '../../../UnbxdSearchWrapper';
import SearchBox from '../../searchBox';
import { searchResponse } from './mocks/searchMock';
import { facetResponse } from './mocks/facetResponse';
import SelectedFacets from '../../selectedFacets/index';
import FacetActions from '../../facetActions/index';

const FacetItemComponent = ({ itemData, onClick }) => {
    const { name, count, isSelected } = itemData;
    const handleClick = () => {
        onClick(itemData);
    };

    return (
        <div
            className={`UNX-facet__item test-class ${
                isSelected ? '-selected' : ''
            }`}
            onClick={handleClick}
        >
            <div className="-checkbox" />
            <div className="-label">{name}</div>
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
            <span>
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

const ApplyFilterComponent = ({ onApplyFilter }) => (
    <button className="filter-apply" onClick={onApplyFilter}>
        Apply
    </button>
);

const ClearFilterComponent = ({ onClearFilter }) => (
    <button className="filter-clear" onClick={onClearFilter}>
        Clear
    </button>
);

// establish API mocking before all tests
beforeAll(() => {
    window.fetch = jest.fn((request) => {
        if (request.includes('filter=brand_uFilter:"Scarpa"')) {
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

test('Match Snapshot for text facets', async () => {
    const tree = renderer.create(
        <UnbxdSearchWrapper
            siteKey="wildearthclone-neto-com-au808941566310465"
            apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
        >
            <SelectedFacets />
            <FacetActions />
            <TextFacets />
            <Products attributesMap={attributesMap} />
            <div>
                <SearchBox defaultSearch="shoes" />
            </div>
        </UnbxdSearchWrapper>
    );
    await waitFor(() => tree.toJSON());
    expect(tree.toJSON()).toMatchSnapshot();
});

test('Test text facet actions showApplyFilter', async () => {
    const { container } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <FacetActions showApplyFilter={false} />
                <TextFacets />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(
            container.getElementsByClassName('UNX-facet__action -applyFilters')
                .length
        ).toBe(0);
    });
});

test('Test text facet actions with applyFilter Component', async () => {
    const { container } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <FacetActions applyFilterComponent={<ApplyFilterComponent />} />
                <TextFacets />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(container.getElementsByClassName('filter-apply').length).toBe(1);
    });
});

test('Test text facet actions showClearFilter', async () => {
    const { container } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <FacetActions showClearFilter={false} />
                <TextFacets />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(
            container.getElementsByClassName('UNX-facet__action  -clearFilters')
                .length
        ).toBe(0);
    });
});

test('Test text facet actions with clearFilter Component', async () => {
    const { container } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <FacetActions clearFilterComponent={<ClearFilterComponent />} />
                <TextFacets />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(container.getElementsByClassName('filter-clear').length).toBe(1);
    });
});

test('Test text facet actions with custom onApply method', async () => {
    const onApply = jest.fn();
    const { getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <FacetActions onApply={onApply} />
                <TextFacets />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(getByText('Scarpa - 18')).toBeInTheDocument();
        fireEvent.click(getByText('Scarpa - 18'));
        fireEvent.click(getByText('Apply Facets'));
        expect(onApply).toHaveBeenCalledTimes(1);
    });
});

test('Test text facet actions with custom onClear method', async () => {
    const onClear = jest.fn();
    const { getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <FacetActions onClear={onClear} />
                <TextFacets />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        fireEvent.click(getByText('Clear Facets'));
        expect(onClear).toHaveBeenCalledTimes(1);
    });
});

test('Test text facet click', async () => {
    const { getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <TextFacets />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(async () => {
        expect(getByText('Scarpa - 18')).toBeInTheDocument();
        fireEvent.click(getByText('Scarpa - 18'));
    });
    await waitFor(() => {
        expect(
            getByText(
                'Scarpa Mont Blanc Pro GTX Goretex Unisex Mountaineering Boots'
            )
        ).toBeInTheDocument();
        fireEvent.click(getByText('Clear'));
    });
});

test('Test text facet with FacetItemComponent', async () => {
    const { container } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <TextFacets facetItemComponent={<FacetItemComponent />} />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(container.getElementsByClassName('test-class').length).toBe(118);
    });
});

test('Test text facet click with FacetItemComponent', async () => {
    const { getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <TextFacets facetItemComponent={<FacetItemComponent />} />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(async () => {
        expect(getByText('Scarpa')).toBeInTheDocument();
        fireEvent.click(getByText('Scarpa'));
    });
    await waitFor(() => {
        expect(
            getByText(
                'Scarpa Mont Blanc Pro GTX Goretex Unisex Mountaineering Boots'
            )
        ).toBeInTheDocument();
        fireEvent.click(getByText('Clear'));
    });
});

test('Test selected facet click on text Facet', async () => {
    const { getByText, container } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <SelectedFacets />
                <TextFacets />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(async () => {
        expect(getByText('Scarpa - 18')).toBeInTheDocument();
        fireEvent.click(getByText('Scarpa - 18'));
    });
    await waitFor(() => {
        expect(
            container.getElementsByClassName('UNX-selectedFacets__container')
                .length
        ).toBe(1);
        fireEvent.click(getByText('Clear'));
    });
});

test('Test selected facet click on text Facet with FacetItemComponent', async () => {
    const { getByText, container } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <SelectedFacets
                    facetItemComponent={<FacetItemComponentSelected />}
                />
                <TextFacets />
                <Products attributesMap={attributesMap} />
                <div>
                    <SearchBox defaultSearch="shoes" />
                </div>
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(async () => {
        expect(getByText('Scarpa - 18')).toBeInTheDocument();
        fireEvent.click(getByText('Scarpa - 18'));
    });
    await waitFor(() => {
        expect(container.getElementsByClassName('text-selected').length).toBe(
            1
        );
    });
});
