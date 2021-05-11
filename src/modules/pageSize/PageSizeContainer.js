import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import PageSizeWrapper from './PageSizeWrapper';
import { getUpdatedOptions } from './utils';
import { searchStatus } from '../../config';

class PageSizeContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        const { size, sizeOptions } = this.props;
        this.state = {
            size,
            sizeOptions
        };
    }

    componentDidMount() {
        const {
            size,
            helpers: { setPageSizeConfiguration },
            unbxdCore
        } = this.props;
        const { sizeOptions } = this.state;
        const { rows = false } = unbxdCore.getQueryParams();
        const numberOfProducts = Number(rows || size);
        if (!isNaN(numberOfProducts)) {
            const updatedSizeOptions = getUpdatedOptions(
                sizeOptions,
                numberOfProducts
            );
            this.setState({
                size: numberOfProducts || parseInt(size),
                sizeOptions: updatedSizeOptions
            });
            setPageSizeConfiguration({
                size: numberOfProducts || parseInt(size)
            });
        }
    }

    componentDidUpdate(prevProps) {
        const {
            unbxdCore,
            unbxdCoreStatus,
            pageSize,
            sizeOptions
        } = this.props;
        const { rows } = unbxdCore.getQueryParams();
        if (
            unbxdCoreStatus !== prevProps.unbxdCoreStatus &&
            unbxdCoreStatus === searchStatus.LOADING &&
            typeof rows === 'string' &&
            pageSize !== rows &&
            prevProps.pageSize === pageSize
        ) {
            const size = parseInt(rows);
            const updatedSizeOptions = getUpdatedOptions(sizeOptions, size);
            this.setState({ size, sizeOptions: updatedSizeOptions });
        }
    }

    getPageSizeProps() {
        const {
            unbxdCore,
            pageSizeItemComponent,
            displayType,
            label,
            helpers: { setPageSizeConfiguration }
        } = this.props;
        const { sizeOptions } = this.state;
        const { noOfPages = 0 } = unbxdCore.getPaginationInfo() || {};

        const onPageSizeClick = (pagesizeOption) => {
            const size = pagesizeOption.target
                ? parseInt(pagesizeOption.target.value)
                : pagesizeOption.id;
            const updatedSizeOptions = sizeOptions.map((sizeOption) => ({
                ...sizeOption,
                isSelected: sizeOption.id === size
            }));
            this.setState({ size, sizeOptions: updatedSizeOptions });
            setPageSizeConfiguration(
                {
                    size
                },
                true
            );
        };

        const { size } = this.state;
        return {
            pageSizeItemComponent,
            sizeOptions,
            displayType,
            onPageSizeClick,
            size,
            noOfPages,
            label
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
    helpers: PropTypes.object.isRequired,
    size: PropTypes.number,
    sizeOptions: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.number, value: PropTypes.string })
    ).isRequired,
    displayType: PropTypes.string,
    pageSizeItemComponent: PropTypes.element,
    label: PropTypes.node
};

export default PageSizeContainer;
