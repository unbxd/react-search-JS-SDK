import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import PageSizeWrapper from './PageSizeWrapper';

class PageSizeContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    const { size } = this.props;
    this.state = {
      size
    };
  }

  componentDidMount() {
    const {
      size,
      helpers: { setPageSizeConfiguration },
      unbxdCore
    } = this.props;
    const { rows = false } = unbxdCore.getQueryParams();
    if(!isNaN(rows))
      this.setState({ size: parseInt(rows)|| parseInt(size)});
    setPageSizeConfiguration({
      size: parseInt(rows)|| parseInt(size)
    });
  }

  getPageSizeProps() {
    const {
      unbxdCore,
      PageSizeItemComponent,
      sizeOptions,
      displayType,
      label,
      helpers: { setPageSizeConfiguration }
    } = this.props;

    const { noOfPages = 0 } = unbxdCore.getPaginationInfo() || {};
    const onPageSizeClick = event => {
      const size =
        parseInt(event.target.dataset.unxpagesize) ||
        parseInt(event.target.value);

      this.setState({ size });
      setPageSizeConfiguration(
        {
          size
        },
        true
      );
    };
    const { size } = this.state;
    return {
      PageSizeItemComponent,
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
  unbxdCoreStatus: PropTypes.string.isRequired,
  helpers: PropTypes.object.isRequired,
  size: PropTypes.number,
  sizeOptions: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number, value: PropTypes.string })
  ).isRequired,
  displayType: PropTypes.string,
  PageSizeItemComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  label:PropTypes.node
};

export default PageSizeContainer;
