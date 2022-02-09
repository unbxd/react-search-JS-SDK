import renderer from 'react-test-renderer';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import Products from '../../products';
import UnbxdSearchWrapper from '../../../UnbxdSearchWrapper';
import SearchBox from '../index';
import { searchBoxResponse } from './mocks';

// establish API mocking before all tests
beforeAll(() => {
    window.fetch = jest.fn(() => {
        return Promise.resolve({
            json: () => Promise.resolve(searchBoxResponse)
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

test('Match Snapshot for search box', async () => {
    const tree = renderer.create(
        <UnbxdSearchWrapper
            siteKey="wildearthclone-neto-com-au808941566310465"
            apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
        >
            <SearchBox defaultSearch="shoes" />
            <Products attributesMap={attributesMap} />
        </UnbxdSearchWrapper>
    );
    await waitFor(() => tree.toJSON());
    expect(tree.toJSON()).toMatchSnapshot();
});

test('Search Box Input test', async () => {
    const { container, getByText } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <SearchBox defaultSearch="boots1" />
                <Products attributesMap={attributesMap} />
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(
            container.getElementsByClassName('UNX-searchbox__input').length
        ).toEqual(1);
        expect(getByText('Search')).toBeInTheDocument();
    });
});

test('Search Box Clearable test', async () => {
    const { container, getByText, getByTestId } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <SearchBox clearable={true}/>
                <Products attributesMap={attributesMap} />
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(
            container.getElementsByClassName('UNX-searchbox__input').length
        ).toEqual(1);
        expect(getByText('Search')).toBeInTheDocument();
        //expect(screen.getByDisplayValue('boots1')).toBeInTheDocument();
        fireEvent.click(getByTestId('UNX-searchbox__clearIcon'));
        expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });
});

test('Search Box callback test', async () => {
    const onSubmit = jest.fn();
    const onClear = jest.fn();
    const { container, getByText, getByTestId } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <SearchBox
                    onSubmit={onSubmit}
                    onClear={onClear}
                    clearable={true}
                />
                <Products attributesMap={attributesMap} />
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(
            container.getElementsByClassName('UNX-searchbox__input').length
        ).toEqual(1);
        expect(getByText('Search')).toBeInTheDocument();
        fireEvent.click(getByText('Search'));
        //expect(onSubmit).toHaveBeenCalledTimes(1);
        fireEvent.click(getByTestId('UNX-searchbox__clearIcon'));
        //expect(onClear).toHaveBeenCalledTimes(1);
        //expect(onSubmit).toHaveBeenCalledTimes(0);
        fireEvent.click(getByTestId('UNX-searchbox__clearIcon'));
        //expect(onClear).toHaveBeenCalledTimes(0);
    });
});

test('Search Box input component test', async () => {
    const onSearchBoxChange = jest.fn();
    const InputComponent = ({ query }) => {
        return (
            <input
                data-testid="custom-search-input"
                value={query}
                onChange={onSearchBoxChange}
            />
        );
    };

    const { getByTestId } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <SearchBox inputComponent={<InputComponent />} />
                <Products attributesMap={attributesMap} />
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(getByTestId('custom-search-input')).toBeInTheDocument();
        fireEvent.change(getByTestId('custom-search-input'), {
            target: { value: 'shoes' }
        });
        //expect(onSearchBoxChange).toHaveBeenCalledTimes(1);
    });
});

test('Search Box submit component test', async () => {
    const onSearchBoxSubmit = jest.fn();
    const SubmitComponent = () => {
        return (
            <div data-testid="custom-search-btn" onClick={onSearchBoxSubmit}>
                {' '}
                Submit
            </div>
        );
    };

    const { getByTestId } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <SearchBox submitComponent={<SubmitComponent />} />
                <Products attributesMap={attributesMap} />
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(getByTestId('custom-search-btn')).toBeInTheDocument();
        fireEvent.click(getByTestId('custom-search-btn'));
        //expect(onSearchBoxSubmit).toHaveBeenCalledTimes(1);
    });
});

test('Search Box search component test', async () => {
    const onSearchBoxClear = jest.fn();
    const ClearComponent = () => {
        return (
            <div data-testid="custom-clear-btn" onClick={onSearchBoxClear}>
                {' '}
                x{' '}
            </div>
        );
    };

    const { getByTestId } = render(
        <>
            <UnbxdSearchWrapper
                siteKey="wildearthclone-neto-com-au808941566310465"
                apiKey="e6959ae0b643d51b565dc3e01bf41ec1"
            >
                <SearchBox
                    clearable={true}
                    clearComponent={<ClearComponent />}
                />
                <Products attributesMap={attributesMap} />
            </UnbxdSearchWrapper>
        </>
    );

    await waitFor(() => {
        expect(getByTestId('custom-clear-btn')).toBeInTheDocument();
        fireEvent.click(getByTestId('custom-clear-btn'));
        //expect(onSearchBoxClear).toHaveBeenCalledTimes(1);
    });
});
