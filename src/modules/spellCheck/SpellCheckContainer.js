import React from 'react';
import PropTypes from 'prop-types';

import GenerateSpellCheck from './generateSpellCheck';
import { conditionalRenderer } from '../../common/utils';

/**
 * Component to manage query suggestions.
 */
class SpellCheck extends React.PureComponent {
  componentDidMount() {
    const {
      helpers: { setSpellCheckConfiguration }
    } = this.props;
    setSpellCheckConfiguration({ enable: true });
  }

  getSpellCheckProps() {
    const {
      unbxdCore,
      helpers: { setSearchBoxConfiguration }
    } = this.props;

    const { SpellCheckItemComponent } = this.props;
    const spellChecks = unbxdCore.getDidYouMeanFromResponse();
    const currentQuery = unbxdCore.getSearchQuery() || '';
    const onSuggestionClick = event => {
      const suggestion = event.target.dataset['suggestion'];
      setSearchBoxConfiguration({ query: suggestion });
    };

    return {
      spellChecks,
      currentQuery,
      onSuggestionClick,
      SpellCheckItemComponent
    };
  }

  render() {
    const DefaultRender = GenerateSpellCheck;

    return conditionalRenderer(
      this.props.children,
      this.getSpellCheckProps(),
      DefaultRender
    );
  }
}

SpellCheck.propTypes = {
  unbxdCore: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired,
  SpellCheckItemComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ])
};

export default SpellCheck;
