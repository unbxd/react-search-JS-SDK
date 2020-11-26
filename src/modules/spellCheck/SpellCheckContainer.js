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
            helpers: { setSpellCheckConfiguration },
        } = this.props;
        setSpellCheckConfiguration({ enable: true });
    }

    getSpellCheckProps() {
        const {
            unbxdCore,
            helpers: { setSearchBoxConfiguration },
        } = this.props;

        const { spellCheckItemComponent } = this.props;
        const spellChecks = unbxdCore.getDidYouMeanFromResponse();
        const currentQuery = unbxdCore.getSearchQuery() || '';
        const handleSuggestionClick = (currentItem) => {
            const { suggestion } = currentItem;
            setSearchBoxConfiguration({ query: suggestion });
        };

        return {
            spellChecks,
            currentQuery,
            onSuggestionClick: handleSuggestionClick,
            spellCheckItemComponent,
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
    spellCheckItemComponent: PropTypes.element
};

export default SpellCheck;
