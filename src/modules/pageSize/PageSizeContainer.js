import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import PageSizeWrapper from './PageSizeWrapper';

class PageSizeContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        const { size, sizeOptions } = this.props;
        this.state = {
            size,
            sizeOptions,
        };
    }

    componentDidMount() {
        const {
            size,
            helpers: { setPageSizeConfiguration },
            unbxdCore,
        } = this.props;
        const { sizeOptions } = this.state;
        const { rows = false } = unbxdCore.getQueryParams();
        const numberOfProducts = Number(rows);
        if (!isNaN(numberOfProducts)) {
            const updatedSizeOptions = sizeOptions.map((sizeOption) => ({
                ...sizeOption,
                isSelected: sizeOption.id === numberOfProducts,
            }));
            this.setState({
                size: numberOfProducts || parseInt(size),
                sizeOptions: updatedSizeOptions,
            });
            setPageSizeConfiguration({
                size: numberOfProducts || parseInt(size),
            });
        }
    }

    getPageSizeProps() {
        const {
            unbxdCore,
            PageSizeItemComponent,
            displayType,
            label,
            helpers: { setPageSizeConfiguration },
        } = this.props;
        const setPageSize = unbxdCore.setPageStart.bind(unbxdCore);
        const getResults = unbxdCore.getResults.bind(unbxdCore);
        const { noOfPages = 0 } = unbxdCore.getPaginationInfo() || {};
        const onPageSizeClick = (pagesizeOption) => {
            const size = pagesizeOption.target
                ? parseInt(pagesizeOption.target.value)
                : pagesizeOption.id;
            const updatedSizeOptions = sizeOptions.map((sizeOption) => ({
                ...sizeOption,
                isSelected: sizeOption.id === size,
            }));
            this.setState({ size, sizeOptions: updatedSizeOptions });
            setPageSizeConfiguration(
                {
                    size,
                },
                true
            );
            parseInt(pagesizeOption.target.value)? setPageSize(parseInt(pagesizeOption.target.value)): setPageSize(pagesizeOption.id);
            getResults();
        };
        const { size, sizeOptions } = this.state;
        return {
            PageSizeItemComponent,
            sizeOptions,
            displayType,
            onPageSizeClick,
            size,
            noOfPages,
            label,
        };
    }

    render() {
        const DefaultRender = PageSizeWrapper;

        return conditionalRenderer(
            this.props.children,
            this.getPageSizeProps(),
            DefaultRender
        );
    }
}

PageSizeContainer.propTypes = {
    unbxdCore: PropTypes.object.isRequired,
    unbxdCoreStatus: PropTypes.string.isRequired,
    helpers: PropTypes.object.isRequired,
    size: PropTypes.number,
    sizeOptions: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.number, value: PropTypes.string })
    ).isRequired,
    displayType: PropTypes.string,
    PageSizeItemComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    label: PropTypes.node,
};

export default PageSizeContainer;
